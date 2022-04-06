export class Buttons {
    constructor(scene, id) {
        this.scene = scene;
        this.id = id;
        this.buttons = [];
        this.create = (x = 0, y = 0, id = "default", props = {}) => {
            let texture = props.texture ? props.texture : "white";
            let button = this.scene.add.image(x, y, texture).setInteractive().setScrollFactor(0);
            button.name = id;
            if (props.onClick) this.assignedFunction = props.onClick;

            button.on('pointerup', function (pointer) {
                if (this.assignedFunction) this.assignedFunction(pointer);
            }, this);

            this.buttons.push(button);
        }
    }
}