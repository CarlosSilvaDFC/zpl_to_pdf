document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('monitorButton').addEventListener('click', monitorDownloadsFolder);
  });

  async function convertZplToPdf(file) {
    const reader = new FileReader();

    reader.onload = async function(event) {
      const zplContent = event.target.result;

      try {
        const response = await fetch('http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/pdf'
          },
          body: zplContent
        });

        if (!response.ok) {
          throw new Error('Failed to convert ZPL to PDF');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Open PDF in new tab and print
        const pdfWindow = window.open(url);
        pdfWindow.onload = function() {
          pdfWindow.print();
        };

      } catch (error) {
        console.error('Error:', error);
        alert('Failed to convert ZPL to PDF');
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
  document.getElementById('fileInput').addEventListener('change', handleFileSelect);