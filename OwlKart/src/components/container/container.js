const { Component, useState, useRef } = owl;
import { ProductDisplay } from "./ProductDisplay.js"

export class KartContainer extends Component {
    
    static template = "owlKartContainer";
    static components = { ProductDisplay };
    setup() {
        this.productInput = useRef("ProductInput");
    }

}