interface Composable {
    name: string;
    init: (root: HTMLDivElement) => void;
}


interface Component extends Composable {
    type: string;
    update: () => void;
}
