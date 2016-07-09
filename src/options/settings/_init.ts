
let type = 'page';
let name = 'settings';


let domRoot: HTMLDivElement = null;


let init = (root: HTMLDivElement) => {
    domRoot = root;

    domRoot.innerHTML = `
      <h2>Settings</h2>
      <label>
        <input type = "checkbox" name = "enabled" value = "1"/>
        enable tracking
      </label>
    `;
};

let update = () => {

};

export {type, name, init, update};
