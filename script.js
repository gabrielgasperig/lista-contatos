class ContatoCard extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('contact-template').content.cloneNode(true);
        this.attachShadow({ mode: 'open' }).appendChild(template);
        this.details = this.shadowRoot.querySelector('.details');
        this.toggleButton = this.shadowRoot.querySelector('#toggle');
        this.toggleButton.addEventListener('click', () => this.toggleDetails());
    }

    toggleDetails() {
        const isVisible = this.details.style.display === 'block';
        this.details.style.display = isVisible ? 'none' : 'block';
        this.toggleButton.textContent = isVisible ? 'Mostrar Detalhes' : 'Ocultar Detalhes';
    }
}

customElements.define('contato-card', ContatoCard);

const contacts = [
    {name:'João da Silva', phone: '47 98798-12518', address: 'Rua XV de novembro, 531', city: 'Itajaí', uf: 'SC'},
    {name:'Mario da Silva', phone: '47 98798-48154', address: 'Rua XV de outubro, 15', city: 'Balneário Camboriú', uf: 'SC'},
    {name:'João de Souza', phone: '48 97887-68154', address: 'Rua 13 de julho, 48', city: 'Florianópolis', uf: 'SC'},
    {name:'João Maria', phone: '45 99978-78125', address: 'Rua 7 de setembro, 654', city: 'Curitiba', uf: 'PR'},
    {name:'Maria João', phone: '11 97987-58125', address: 'Rua 21 de abril, 654', city: 'São Paulo', uf: 'SP'},
    {name:'Silva e Souza', phone: '47 99997-65484', address: 'Rua 01 de abril, 21', city: 'Itajaí', uf: 'SC'},
    {name:'Jacinto Filho', phone: '85 99914-12184', address: 'Rua 25 de dezembro, 151', city: 'Rio Branco', uf: 'AC'},
    {name:'Telêmaco Borba', phone: '51 97487-88429', address: 'Rua Marechal Rondom, 315', city: 'Porto Alegre', uf: 'RS'},
    {name:'Hugo Chaves', phone: '47 94156-98781', address: 'Rua Candido Mariano, 651', city: 'Blumenau', uf: 'SC'},
    {name:'Evita Perón', phone: '47 98748-61258', address: 'Avenida Afonso Pena, 2316', city: 'Camboriú', uf: 'SC'}
];

const contactList = document.getElementById('contact-list');
const filterUF = document.getElementById('filterUF');
const searchInput = document.getElementById('search');

function renderContacts() {
    contactList.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();
    const selectedUF = filterUF.value;

    contacts.filter(contact => 
        (selectedUF === '' || contact.uf === selectedUF) && 
        (searchTerm === '' || contact.name.toLowerCase().includes(searchTerm))
    ).forEach(contact => {
        const contatoCard = document.createElement('contato-card');
        contatoCard.innerHTML = `
            <span slot="name">${contact.name}</span>
            <span slot="phone">${contact.phone}</span>
            <span slot="address">${contact.address}</span>
            <span slot="city">${contact.city}</span>
            <span slot="uf">${contact.uf}</span>
        `;
        contactList.appendChild(contatoCard);
    });
}

searchInput.addEventListener('input', renderContacts);
filterUF.addEventListener('change', renderContacts);

const uniqueUFs = [...new Set(contacts.map(c => c.uf))];
uniqueUFs.forEach(uf => {
    const option = document.createElement('option');
    option.value = uf;
    option.textContent = uf;
    filterUF.appendChild(option);
});

renderContacts();