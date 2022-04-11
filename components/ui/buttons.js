export class Buttons {
    constructor(scene, id) {
        this.scene = scene;
        scene.buttons = this;
        this.id = id;
        this.buttons = [];
        this.create = (x = 0, y = 0, id = "default", props = {}) => {
            let texture = props.texture ? props.texture : "white";
            let button = this.scene.add.image(x, y, texture).setInteractive().setScrollFactor(0).setDepth(10);
            button.scale = props.scale ? props.scale : 1;
            button.name = id;
            if (props.onClick) button.assignedFunction = props.onClick;

            button.on('pointerup', function (pointer) {
                if (button.assignedFunction) button.assignedFunction(pointer);
            }, this);

            this.buttons.push(button);
            return button;
        }
    }
}