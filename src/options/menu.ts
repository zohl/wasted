/// <reference path="./component.d.ts"/>

let mkAnchor = (name: string) => (['<a href = "#', name, '">', name, '</a>'].join(''));
let mkContainer = (name: string) => (['<div class = "', name, '"></div>'].join(''));

let mkMenu = <T extends Composable>(
      domMenu       : HTMLDivElement
    , domContents   : HTMLDivElement
    , updateCallback: ((item:T) => void)
    , items         : Array<T>
) => {
    items.forEach(item => {
        let name = item.name;

        domMenu.insertAdjacentHTML('beforeend', mkAnchor(name));
        let domAnchor = <HTMLAnchorElement>(domMenu.querySelector('a[href="#' + name + '"]'));

        domContents.insertAdjacentHTML('beforeend', mkContainer(name));
        let domContainer = <HTMLDivElement>domContents.querySelector('.' + name); //TODO >

        domAnchor.onclick = () => {
            let domPage = <HTMLDivElement>domContents.querySelector('.active'); //TODO >, *all
            if (domPage != null) {
                domPage.classList.remove('active');
            }
            updateCallback(item);
            domContainer.classList.add('active');
            return false;
        };

        item.init(domContainer);
    });
};

export {mkMenu};
