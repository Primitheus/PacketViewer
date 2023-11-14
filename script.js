
let selectedByteIndex = -1;

function formatHexInput() {
    
    const inputText = document.getElementById("packetInput").value;

    const hexArray = inputText.split(' ');

    const formattedHexArray = hexArray.map(hex => {
        return hex.toUpperCase().replace(/0X/g, '').replace(/,/g, '');
    });

    const outputText = formattedHexArray.join(' ');

    document.getElementById("hexDataView").innerHTML = formatHexView(outputText);
    document.getElementById("packetLength").textContent = `Packet Length: ${formattedHexArray.length}`;

    const asciiData = formattedHexArray.map(hex => {
    if (hex == "00") {
        return '\x02'; 
    } else {
        return String.fromCharCode(parseInt(hex, 16));
    }
    });

    document.getElementById("asciiDataView").innerHTML = formatAsciiView(asciiData);
}

function formatAsciiView(asciiData) {
    return asciiData.map((char, index) => {
    return `<span data-index="${index}">${char}</span>`;
    }).join(' ');
}

function formatHexView(hexData) {
    return hexData.split(' ').map((byte, index) => {
    return `<span data-index="${index}">${byte}</span>`;
    }).join(' ');
}

let selectedByte = null

document.getElementById("hexDataView").addEventListener("click", function (event) {
    if (event.target.tagName === "SPAN") {
        if (selectedByte) {
        selectedByte.classList.remove("selected");
        document.querySelector(`#asciiDataView span[data-index="${selectedByteIndex}"]`).classList.remove("selected");
    }

    selectedByte = event.target;

    selectedByteIndex = parseInt(selectedByte.getAttribute("data-index"), 10);

    selectedByte.classList.add("selected");
    document.querySelector(`#asciiDataView span[data-index="${selectedByteIndex}"]`).classList.add("selected");

    const selectedByteInfo = document.getElementById("selectedByteInfo");
    selectedByteInfo.textContent = `Selected Byte Index: ${selectedByteIndex}, ASCII: ${String.fromCharCode(parseInt(selectedByte.textContent, 16))}`;
    }
});