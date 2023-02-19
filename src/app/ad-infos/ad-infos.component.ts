import { Ad } from './../ad';
import { Component, ViewChild } from '@angular/core';
import axios from 'axios' ; 
import { Router, ActivatedRoute, ParamMap, Route } from '@angular/router';
import { AdDetails } from '../ad-details'; 
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { ElementRef } from '@angular/core';
import { Lightbox } from 'ng-gallery/lightbox'; 
import { Renderer2 } from '@angular/core';

@Component({
  
  selector: 'app-ad-infos',
  templateUrl: './ad-infos.component.html',
  styleUrls: ['./ad-infos.component.css'] , 
  
})
export class AdInfosComponent {  
  @ViewChild('target') elementRef!: ElementRef ;
  slidesStore : any[] = [] ;
  galleryId = 'myLightbox'
  arrayPreview!: string[];
   
public preview(src:string){ 
  this.imagePreview = src
  this.isOpened = true
}
 
isDescriptionLong(){
  if(this.ad.description.length > 147){
    return true
  }
  else{
    return false
  }
}
nextImage(){ 
  const arrayOfPics : any[] = [];
   const el = (this.slidesStore.filter(element => element.src == this.imagePreview))
   this.slidesStore.map(el => {
    arrayOfPics.push(el.data.src)
   })  
   let index = arrayOfPics.indexOf(this.imagePreview)
   if(arrayOfPics[index+1] !== undefined) {
    this.imagePreview = arrayOfPics[index+1]
   }else{
    this.imagePreview = arrayOfPics[0]
   }
   
  }
  prevImage(){ 
    const arrayOfPics : any[] = [];
     const el = (this.slidesStore.filter(element => element.src == this.imagePreview))
     this.slidesStore.map(el => {
      arrayOfPics.push(el.data.src)
     })  
     let index = arrayOfPics.indexOf(this.imagePreview)
     if(arrayOfPics[index-1] !== undefined) {
      this.imagePreview = arrayOfPics[index-1]
     }else{
      this.imagePreview = arrayOfPics[arrayOfPics.length-1]
     }
     
    }
 
closeModal(){
  this.imagePreview = "" ; 
  this.isOpened = false
}
  dynamicSlides = [ new ImageItem({ src: 'IMAGE_SRC_URL', thumb: 'IMAGE_THUMBNAIL_URL' }) ];
  id : string | undefined;
  imagePreview !: string ;
  isOpened = false ; 
  ad :any ;
  index : number | undefined ;
  itemClicked(o:any){ 
   let index = this.elementRef.nativeElement.querySelector('gallery-item').getAttribute('ng-reflect-curr-index') 
   this.preview(this.slidesStore[index].data.src)
  }
  
  constructor(private route: ActivatedRoute, private gallery : Gallery , private renderer: Renderer2) { 
    
    this.route.queryParams
    .subscribe(params => { 
      this.id = params['id'];
      
      const API_KEY = "Tviko1998Trebinje"
      const instance = axios.create({
         
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });

    if(params["id"] == "0") {
      this.ad = {
        "id": "70",
        "squarefeet": "60",
        "adress": "Republike Srpske 1", 
        "rooms": "četvorosob",
        "description": "Lorem Ipsum text",
        "stage": "II"
      }
      this.slidesStore = [new ImageItem({ src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPCXISA7AWonO3J24GKCgtJ9e4OTuaJHSBM7rcN3j28GfR6eJAJTe1Gi_AlJpG6wuFnCs&usqp=CAU', thumb: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/41438/41438-b580.jpg' }), new ImageItem({ src: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80' }) , new ImageItem({ src: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/41438/41438-b580.jpg', thumb: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/41438/41438-b580.jpg' }) , new ImageItem({ src: 'https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg', thumb: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/41438/41438-b580.jpg' })]
    }else{
      instance.get('https://backoffice.tvikonekretnine.com/Ad.php?id='+this.id).then((res) => {
        this.ad = res.data[0]
        var slides = new ImageItem({src:res.data[0].mainImage , thumb:res.data[0].otherImages})
        res.data[0].otherImages ; 
        this.slidesStore?.push(slides) 
        for (let i = 0; i < res.data[0].otherImages.length; i++) {
        
           var el = new ImageItem({src:res.data[0].otherImages[i] , thumb:res.data[0].otherImages[i]})
          this.slidesStore.push(el)
        }
        
      })
    }
      
    }
  ); 
  }

  ngOnInit() { 
 
  }
  ngAfterViewInit() {
  
  }

}
 

