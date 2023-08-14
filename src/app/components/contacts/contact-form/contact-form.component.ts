import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/interfaces/address';
import { Contact } from 'src/app/interfaces/contact';
import { Coordinate } from 'src/app/interfaces/coordinate';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contactForm: FormGroup;
  results: any;
  selectedAddress: any;

  constructor(
    private contactService: ContactsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute){

    this.contactForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      cpf: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      zip_code: ['', Validators.required],
      uf: ['', Validators.required],
      city: ['', Validators.required],
      lat: [''],
      lng: ['']
    })
  }

  ngOnInit() {
    const action = this.router.url
    const id = parseInt(action.split('/')[3])

    if(action.includes('edit')){
      this.contactService.getContact(id).subscribe(
        (response) => {
          this.contactForm.patchValue({
            id: id,
            name: response.name,
            cpf: response.cpf,
            phone: response.phone,
            street: response.address.street,
            number: response.address.number,
            complement: response.address.complement,
            uf: response.address.uf,
            neighborhood: response.address.neighborhood,
            city: response.address.city,
            zip_code: response.address.zip_code,
            lat: response?.coordinate?.latitude,
            lng: response?.coordinate?.longitude
          })
        },
        (error) => {
          this.router.navigate(['/contacts/'])
        }
      )
    }
  }

  onSubmit(){
    if(this.contactForm.valid){
      const coordinate: Coordinate = {
        latitude: this.contactForm.get('lat')?.value,
        longitude: this.contactForm.get('lng')?.value,
      };

      const address: Address = {
        street: this.contactForm.get('street')?.value,
        number: this.contactForm.get('number')?.value,
        complement: this.contactForm.get('complement')?.value,
        neighborhood: this.contactForm.get('neighborhood')?.value,
        zip_code: this.contactForm.get('zip_code')?.value,
        uf: this.contactForm.get('uf')?.value,
        city: this.contactForm.get('city')?.value,
        coordinate_attributes: coordinate
      };

      const contact: Contact = {
        id: this.contactForm.get('id')?.value ?? 0,
        name: this.contactForm.get('name')?.value,
        phone: this.contactForm.get('phone')?.value,
        cpf: this.contactForm.get('cpf')?.value,
        address_attributes: address
      };

      const action = this.router.url
      if(action.includes('edit')){
        this.contactService.updateContact(contact).subscribe(
          (response) => {
            this.router.navigate(['/contacts/'])
          },
          (error) => {
          }
        )
      }
      else{
        this.contactService.createContact(contact).subscribe(
          (response) => {
            this.router.navigate(['/contacts'])
          },
          (error) => {
          }
        )
      }
    }
  }

  viacepSearch(){
    const zip_code = this.contactForm.value.zip_code

    if(zip_code?.length == 0 || zip_code == null){
      this.clearFields();
    }

    this.searchCep(zip_code);
  }

  textSearch(){
    const street = this.contactForm.value.street

    if(street.length == 0){
      return;
    }
    else{
      this.contactService.textSearch(street).subscribe(
        (response) => {
          this.results = response.body;
        },
        (error) => {
        }
      )
    }
  }

  onSelect(address: any){
    let data = address?.formatted_address ? address.formatted_address : address.target.outerText;
    let cep = null;

    for (const item of data.split(', ')) {
      if (item.length == 9) {
        cep = item;
        break;
      }
    }

    this.searchCep(cep);
  }

  clearFields(){
    this.contactForm.patchValue({
      street: '',
      uf: '',
      neighborhood: '',
      city: ''
    })
  }

  searchCep(cep: string){
    this.contactService.viacepApi(cep).subscribe(
      (response) => {
        this.contactForm.patchValue({
          street: response.logradouro,
          uf: response.uf,
          neighborhood: response.bairro,
          city: response.localidade,
          zip_code: response.cep,
          lat: response.lat,
          lng: response.lng
        })
      },
      (error) => {
      }
    )
  }
}
