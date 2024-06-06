const { Component, useRef } = owl;

export class OwlKartNavbar extends Component {
    static template = "owlKartNavbar";

    setup() {
        this.inputRef = useRef("SearchInput");
    }

    

}

OwlKartNavbar.props = {
    searchProduct : {type : Function}
};