interface Component {
    type: string;
    name?: string;
    init: (root: HTMLDivElement) => void;
    update: () => void;
}
