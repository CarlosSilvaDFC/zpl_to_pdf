
function etiquetaProdutoML() {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('monitorButton-ml-product').addEventListener('click', productMonitorDownloadsFolder);
  });
  async function convertZplToPdf(file) {
const reader = new FileReader();

reader.onload = async function(event) {
  let zplContent = event.target.result;

  // Dimensões da etiqueta em mm
  const labelWidthMM = 3.94 / 2;  // mm
  const labelHeightMM = 0.98;     // mm
  const dpi = 8;                  // pontos por mm (dpmm)

  // Converter mm para pontos
  const labelWidthPoints = labelWidthMM * dpi;
  const labelHeightPoints = labelHeightMM * dpi;

  // Ajustar as coordenadas da etiqueta para centralizar o conteúdo
  const adjustForCentering = (labelWidthPoints / 2) + ',' + (labelHeightPoints / 2);
  zplContent = zplContent.replace(/^LH[^\n]*/, `^LH${adjustForCentering}`);

  try {
    // API da Labelary - Remover a limitação de uma página
    const url = `https://api.labelary.com/v1/printers/${dpi}dpmm/labels/${labelWidthMM}x${labelHeightMM}/`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/pdf'
      },
      body: zplContent
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Erro da API Labelary: ' + errorText);
    }

    const blob = await response.blob();
    const pdfUrl = URL.createObjectURL(blob);

    // Criar um link para baixar o PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'etiquetas.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mensagem de sucesso
    document.getElementById('response').innerHTML = '<p>PDF gerado e baixado com sucesso!</p>';

  } catch (error) {
    console.error('Error:', error);
    alert('Falha ao converter ZPL para PDF: ' + error.message);
  }
};

reader.readAsText(file);
}


  async function productMonitorDownloadsFolder() {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const permission = await dirHandle.requestPermission({ mode: 'readwrite' });
      if (permission !== 'granted') {
        throw new Error('Permissão negada');
      }

      // Encontra o arquivo ZPL mais recente
      let latestFile = null;
      let latestTime = 0;
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file' && entry.name.endsWith('.zpl')) {
          const file = await entry.getFile();
          if (file.lastModified > latestTime) {
            latestFile = file;
            latestTime = file.lastModified;
          }
        }
      }

      // Converte apenas o arquivo mais recente (se encontrado)
      if (latestFile) {
        await convertZplToPdf(latestFile);
      } else {
        console.log('Nenhum arquivo ZPL encontrado na pasta de downloads.');
      }
    } catch (error) {
      console.error('Erro ao acessar a pasta de downloads:', error);
    }
  }

  // Função para lidar com a seleção de arquivos manualmente
  async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      await convertZplToPdf(file);
    }
  }

  // Evento de clique para o botão de upload manual
  document.getElementById('fileInput-ml-product').addEventListener('change', handleFileSelect);
}
etiquetaProdutoML();

function etiquetaVolumesML(){
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('monitorButton-ml-volumes').addEventListener('click', monitorDownloadsFolder);
  });
  async function convertZplToPdf(file) {
const reader = new FileReader();

reader.onload = async function(event) {
  let zplContent = event.target.result;

  // Dimensões da etiqueta em mm
  const labelWidthVolumesMM = 3.94;  // in(polegadas) = 100mm
  const labelHeightVolumesMM = 5.91 ;     // in(polegadas) 150mm
  const dpi = 8;                  // pontos por mm (dpmm)

  // Converter mm para pontos
  const labelWidthVolumesPoints = labelWidthVolumesMM * dpi;
  const labelHeightVolumesPoints = labelHeightVolumesMM * dpi;

  // Ajustar as coordenadas da etiqueta para centralizar o conteúdo
  const adjustForCentering = (labelWidthVolumesPoints / 2) + ',' + (labelHeightVolumesPoints / 2);
  zplContent = zplContent.replace(/^LH[^\n]*/, `^LH${adjustForCentering}`);

  try {
    // API da Labelary - Remover a limitação de uma página
    const url = `https://api.labelary.com/v1/printers/${dpi}dpmm/labels/${labelWidthVolumesMM}x${labelHeightVolumesMM}/`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/pdf'
      },
      body: zplContent
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Erro da API Labelary: ' + errorText);
    }

    const blob = await response.blob();
    const pdfUrl = URL.createObjectURL(blob);

    // Criar um link para baixar o PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'etiquetas.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mensagem de sucesso
    document.getElementById('response').innerHTML = '<p>PDF gerado e baixado com sucesso!</p>';

  } catch (error) {
    console.error('Error:', error);
    alert('Falha ao converter ZPL para PDF: ' + error.message);
  }
};

reader.readAsText(file);
}


  async function monitorDownloadsFolder() {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const permission = await dirHandle.requestPermission({ mode: 'readwrite' });
      if (permission !== 'granted') {
        throw new Error('Permissão negada');
      }

      // Encontra o arquivo ZPL mais recente
      let latestFile = null;
      let latestTime = 0;
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file' && entry.name.endsWith('.zpl')) {
          const file = await entry.getFile();
          if (file.lastModified > latestTime) {
            latestFile = file;
            latestTime = file.lastModified;
          }
        }
      }

      // Converte apenas o arquivo mais recente (se encontrado)
      if (latestFile) {
        await convertZplToPdf(latestFile);
      } else {
        console.log('Nenhum arquivo ZPL encontrado na pasta de downloads.');
      }
    } catch (error) {
      console.error('Erro ao acessar a pasta de downloads:', error);
    }
  }

  // Função para lidar com a seleção de arquivos manualmente
  async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      await convertZplToPdf(file);
    }
  }

  // Evento de clique para o botão de upload manual
  document.getElementById('fileInput-ml-volumes').addEventListener('change', handleFileSelect);

}
etiquetaVolumesML();