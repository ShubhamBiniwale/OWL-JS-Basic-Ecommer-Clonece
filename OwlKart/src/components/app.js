const { mount, Component, useState, loadFile, useRef, onWillStart } = owl;
import { OwlKartNavbar } from "./navbar/navbar.js";
import { KartContainer } from "./container/container.js";
import { OwlKartFooter } from "./footer/footer.js";
import { productDb } from "./container/product.js"


class OwlKart extends Component {
    static template = "owlKartRoot";
    static components = { OwlKartNavbar, KartContainer, OwlKartFooter };

    setup() {

        this.addProductFun = this.addProduct.bind(this);
        this.searchProductFun = this.searchProduct.bind(this);

        this.state = useState({ 
            ProductArray: [],
            BkpProductArray: [],
            searchProduct: this.searchProductFun,
            addProduct: this.addProductFun,

        });

        onWillStart(this.onWillStart);
    }

    async onWillStart() {
        await fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                this.state.ProductArray = data;
                this.state.BkpProductArray = data;
                console.log(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    
    }

    addProduct(productObject) {
        try {
            const jsonObject = JSON.parse(productObject);
            this.state.ProductArray.push(jsonObject);
        } catch (error) {
            console.error("Error parsing productObject:", error);
        }
    }


    removeProduct(productObject) {
        try {
            const jsonObject = JSON.parse(productObject);
            this.state.ProductArray.push(jsonObject);
        } catch (error) {
            console.error("Error parsing productObject:", error);
        }
    }


    searchProduct(searchValue){
        const keywords = searchValue.split(' ');
        const matchedProducts = this.state.ProductArray.filter(product => 
              keywords.some(keyword => 
                product.title.toLowerCase().includes(keyword) || 
                product.description.toLowerCase().includes(keyword)
              )
        );

        this.state.ProductArray = matchedProducts;

        if (searchValue == ''){
            this.state.ProductArray = this.state.BkpProductArray;    
        }

        console.log("Matched Products:", matchedProducts);

    }


}
const templates = await loadFile("./components/root_app.xml");

mount(OwlKart, document.body, { templates });