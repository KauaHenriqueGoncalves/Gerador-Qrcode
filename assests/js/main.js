;(function(){
    const inUrl = document.getElementById('inUrl');
    inUrl.focus();
    const outQrcode = document.getElementById('outQrcode');

    function generateOutputQrcode() {
        outQrcode.innerHTML = '';
        outQrcode.style.marginTop = '5px';
        outQrcode.style.padding = '.5rem';

        const output = document.createElement('output');
        output.setAttribute('id', 'qrcode');
        outQrcode.append(output);

        const div = document.createElement('div');
        div.classList.add('buttons-qrcode');
        outQrcode.append(div);

        const btnClear = document.createElement('button');
        btnClear.classList.add('btn', 'btnClear');
        btnClear.innerText = 'Apagar';
        div.append(btnClear);

        btnClear.addEventListener('click', deleteOutput);

        const btnDownload = document.createElement('button');
        btnDownload.classList.add('btn', 'btnDownload');
        btnDownload.innerText = 'Download';
        div.append(btnDownload);

        btnDownload.addEventListener('click', downlaodQrcode);
    }

    function deleteOutput() {
        outQrcode.innerHTML = '';
        outQrcode.style.marginTop = '0';
        outQrcode.style.padding = '0';
        inUrl.value = '';
        inUrl.focus();
    }

    function downlaodQrcode() {
        const nameQrcode = prompt('Gostaria de nomear o Qr code?');
        html2canvas(document.getElementById('qrcode')).then( qrcode => {
            var link = document.createElement('a');
            link.href = qrcode.toDataURL();
            link.download = Boolean(nameQrcode)?`${nameQrcode}.png`:'Qrcode.png';
            link.click();
        })
    }

    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const url = this.inUrl.value;

        generateOutputQrcode();

        var qrcode = new QRCode(document.getElementById('qrcode'), {
            text: url,
            width: 180,
            height: 180,
            colorDark : "#000000",
            colorLight : "#f2f2f2",
            correctLevel : QRCode.CorrectLevel.H
        });
    });
})()
