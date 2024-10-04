let currentId = 1;
let links = [];  // Simulate a JSON file as an array of objects

fetch('../webScraping/data/Link_for_Funds_With_PrimaryKey.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    links = data;// Process your JSON data here
    renderLinks();
    console.log("links",links); 
  })
  .catch(error => {
    console.error('Error fetching the JSON file:', error);
  });
  
  
function renderLinks() {
    const table = document.getElementById("linksTable").getElementsByTagName("tbody")[0];
    table.innerHTML = "";  // Clear table
    links.forEach((link) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = link.ID;
        row.insertCell(1).textContent = link.Resource;
        row.insertCell(2).textContent = link.location;
        row.insertCell(3).textContent = link.Description;
        row.insertCell(4).innerHTML = `<a href="${link.Link}" target="_blank">${link.Link}</a>`;

        // Actions (Edit & Delete)
        const actionsCell = row.insertCell(5);
        actionsCell.innerHTML = `
            <button onclick="editLink(${link.ID})">Edit</button>
            <button onclick="deleteLink(${link.ID})">Delete</button>
        `;
    });
}

function addOrUpdateLink() {
    const id = document.getElementById("linkId").value;
    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const website = document.getElementById("website").value;

    if (id) {
        // Update existing link
        const link = links.find(link => link.id === parseInt(id));
        link.name = name;
        link.location = location;
        link.description = description;
        link.website = website;
    } else {
        // Add new link
        const newLink = { id: currentId++, name, location, description, website };
        links.push(newLink);
    }

    renderLinks();
    document.getElementById("linkForm").reset();
    document.getElementById("linkId").value = "";  // Reset hidden ID field
}

function editLink(id) {
    const link = links.find(link => link.ID === id);
    document.getElementById("linkId").value = link.ID;
    document.getElementById("name").value = link.Resource;
    document.getElementById("location").value = link.location;
    document.getElementById("description").value = link.description;
    document.getElementById("website").value = link.website;
}

function deleteLink(id) {
    links = links.filter(link => link.ID !== id);
    renderLinks();
}

renderLinks();  // Initial render
