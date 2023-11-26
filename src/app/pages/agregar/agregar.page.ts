import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { MessageService } from 'src/app/services/message.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
})
export class AgregarPage implements OnInit {
  formulario: FormGroup;
  cocktail: any;

  constructor(
    private productsService: ProductsService,
    private msg: MessageService,
    private apiService: ApiService
  ) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      image: new FormControl() // Aquí almacenaremos la URL de la imagen del cóctel
    })
  }
  
  ngOnInit() {}

  async onSubmit() {
    const productName = this.formulario.value.name;
    this.apiService.getCocktailByName(productName)
    .subscribe(data => {
      console.log('Data de la API:', data); // Verifica los datos obtenidos de la API
      if (data && data.drinks && data.drinks.length > 0) {
        this.cocktail = data.drinks[0];
        console.log('Cóctel encontrado:', this.cocktail); // Verifica el cóctel encontrado
        this.formulario.patchValue({ image: this.cocktail.strDrinkThumb });
        console.log('URL de imagen:', this.cocktail.strDrinkThumb); // Verifica la URL de la imagen
        console.log(this.formulario.value);
        this.productsService.addProduct(this.formulario.value);
        this.msg.presentToast("Producto agregado con éxito","noti");
        console.log(this.formulario.value);
      }else {
        this.formulario.patchValue({ image: 'https://ionicframework.com/docs/img/demos/card-media.png' });
        this.productsService.addProduct(this.formulario.value);
        this.msg.presentToast("Producto agregado con éxito","noti");
        console.log(this.formulario.value);
      }
    });
    
  }
}
