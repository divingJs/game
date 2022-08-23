/*******************************************
 * Label
 *******************************************/
class Label {
    constructor() {}
    init(ctx, l, t, txt) {
        this.ctx = ctx;
        this.l = l;
        this.t = t;
        this.txt = txt;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#a4a4a4';
        this.ctx.fillText(this.txt, this.l, this.t);
        this.ctx.stroke();
    }
    update(text) {
        this.txt = text;
    }
}
/*******************************************
 * Line
 *******************************************/
class Line {
    constructor() {}
    init(ctx, l1, t1, l2, t2) {
        this.ctx = ctx;
        this.l1 = l1;
        this.t1 = t1;
        this.l2 = l2;
        this.t2 = t2;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.strokeStyle  = "#c3d9d8aa";
        this.ctx.moveTo(this.l1, this.t1);
        this.ctx.lineTo(this.l2, this.t2);
        this.ctx.stroke();
    }
}
/*******************************************
 * Mapa
 *******************************************/
class Mapa {
    constructor() {
        this.horizontal = [];
        this.vertical = [];
    }
    init(ctx, l, t, w, h) {
        this.l = l;
        this.t = t;
        this.w = w;
        this.h = h;
        var th = (w / 10) - 2;
        for (var i = 0; i < th; i++) {
            this.horizontal.push(new Line());
        }
        var tv = (h / 10) - 2;
        for (var i = 0; i < tv; i++) {
            this.vertical.push(new Line());
        }
        var vl1 = l,
            vt1 = t,
            vl2 = l,
            vt2 = h;
        var hl1 = l,
            ht1 = t,
            hl2 = w,
            ht2 = t;
        var constante = 0;
        for (var i = 0; i < this.horizontal.length; i++) {
            vl1 = vl1 + constante;
            vl2 = vl2 + constante;
            this.horizontal[i].init(ctx, vl1, vt1, vl2, vt2);
            constante = 10;
        }
        constante = 0;
        for (var i = 0; i < this.vertical.length; i++) {
            ht1 = ht1 + constante;
            ht2 = ht2 + constante;
            this.vertical[i].init(ctx, hl1, ht1, hl2, ht2);
            constante = 10;
        }
    }
    draw() {
        for (var i = 0; i < this.horizontal.length; i++) {
            this.horizontal[i].draw();
        }
        for (var i = 0; i < this.vertical.length; i++) {
            this.vertical[i].draw();
        }
    }
    getL() {
        return this.l;
    }
    getT() {
        return this.t;
    }
    getW() {
        return this.w;
    }
    getH() {
        return this.h;
    }
}
/*******************************************
 * Button
 *******************************************/
class Button {
    constructor() {
        this.label = new Label();
    }
    init(ctx, l, t, w, h, txt) {
        this.ctx = ctx;
        this.t = t;
        this.l = l;
        this.w = w;
        this.h = h;
        this.txt = txt;
        this.label.init(this.ctx,
            this.l + 10,
            this.t + (this.h / 2),
            this.txt
        );
    }
    draw() {
        var ts = this;
        var ctx = ts.ctx;
        ctx.beginPath();
        this.ctx.fillStyle = '#4a4a4a';
        this.area = {
            l: this.l,
            t: this.t,
            w: this.w,
            h: this.h
        };
        ctx.fillRect(ts.l, ts.t, ts.w, ts.h);
        
        ctx.fillStyle="#a4a4a4";
        ctx.rect(ts.l, ts.t, ts.w, ts.h);
        ctx.stroke();

        this.label.draw();

    }
    collition(x, y) {
        var elemLeft = this.ctx.canvas.offsetLeft;
        var elemTop = this.ctx.canvas.offsetTop;
        y = y - elemTop;
        x = x - elemLeft;
        return (((x > this.area.l) && (x < (this.area.l + this.area.w))) &&
            ((y > this.area.t) && (y < (this.area.t + this.area.h))));
    }
    click(callback) {
        var ts = this;
        this.ctx.canvas.addEventListener('click', function(e) {
            var x = e.pageX,
                y = e.pageY;
            var clt = ts.collition(x, y);
            if (clt) {
                callback();
            }
        });
    }
}
/*******************************************
 * hSnake
 *******************************************/
class hSnake {
    constructor() {
        this.w = 10;
        this.h = 10;
    }
    init(ctx, l, t, w, h, body) {
        this.ctx = ctx;
        this.l = l;
        this.t = t;
        this.w = w;
        this.h = h;
        this.body = body;
    }
    draw() {
        var ts = this;
        var ctx = ts.ctx;
        ctx.beginPath();
        ctx.fillStyle = '#000000';
        ctx.fillRect(ts.l, ts.t, ts.w, ts.h);
        ctx.stroke();
    }
    update(l, t) {
        this.l = l;
        this.t = t;
    }
    getL() {
        return this.l;
    }
    getT() {
        return this.t;
    }
}
/*******************************************
 * Snake
 *******************************************/
class Snake {
    constructor() {
        this.w = 10;
        this.h = 10;
        this.large();
    }
    large() {
        this.hs = [];
        this.hs.push(new hSnake());
        this.hs.push(new hSnake());
        this.hs.push(new hSnake());
    }
    init(ctx) {
        this.ctx = ctx;
        this.l = 30;
        this.t = 30;
        var x = 0;
        for (var i = this.hs.length; i > 0; i--) {
            this.hs[x].init(ctx, this.l + (i * 10), this.t, 10, 10, (x + 1));
            x++;
        }
    }
    draw() {
        for (var i = 0; i < this.hs.length; i++) {
            this.hs[i].draw();
        }
    }
    mTop() {
        this.t = this.t - this.h;
    }
    mLeft() {
        this.l = this.l + this.w;
    }
    mBottom() {
        this.t = this.t + this.h;
    }
    mRight() {
        this.l = this.l - this.w;
    }
    setDir(dir) {
        this.dir = dir;
    }
    update() {
        switch (this.dir) {
            case 1:
                this.mTop();
                break;
            case 2:
                this.mLeft();
                break;
            case 3:
                this.mBottom();
                break;
            case 4:
                this.mRight();
                break;
        }
        var tmp = {
            l: 0,
            t: 0
        };
        var tmp_new = {
            l: 0,
            t: 0
        };
        for (var i = 0; i < this.hs.length; i++) {
            if (i == 0) {
                tmp.l = this.hs[i].getL();
                tmp.t = this.hs[i].getT();
                this.hs[i].update(this.l, this.t);
            } else {
                tmp_new = {
                    l: this.hs[i].getL(),
                    t: this.hs[i].getT()
                };
                this.hs[i].update(tmp.l, tmp.t);
                tmp = tmp_new;
            }
        }
    }
    getSnake() {
        return this.sh;
    }
}
/*******************************************
 * punto
 *******************************************/
class Point {
    constructor() {
        this.w = 10;
        this.h = 10;
        this.contador = 0;
    }
    init(ctx, snake, l, t, color, comido,tipo) {
        this.ctx = ctx;
        this.snake = snake;
        this.l = l;
        this.t = t;
        this.color = color;
        this.comido = comido;
        this.tipo=tipo;
    }
    draw() {
        if (!this.comido) {
            var ts = this;
            var ctx = ts.ctx;
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(ts.l, ts.t, ts.w, ts.h);
            ctx.stroke();
        }
    }
    update() {
        var sk = this.snake.hs[0];
        if (sk.l == this.l && sk.t == this.t) {
            this.comido = true;
            this.snake.hs.push(new hSnake());
            this.snake.hs[this.snake.hs.length - 1].init(this.ctx, this.l, this.t, 10, 10, this.snake.hs.length);
            this.contador = this.contador + 1;
        }
    }
    getL() {
        return this.l;
    }
    getT() {
        return this.t;
    }
    getContador() {
        return this.contador;
    }
    getComido() {
        return this.comido;
    }
    getTipo(){
        return this.tipo;
    }
}
/*******************************************
 * Game
 *******************************************/
class Game {
    constructor() {
        this.state = 1;
        this.c = document.getElementById("myCanvas");
        this.ctx = this.c.getContext("2d");
        
        this.btn = new Button();
        this.btn_2=new Button();
        
        this.b_up = new Button();
        this.b_rt = new Button();
        this.b_bt = new Button();
        this.b_lf = new Button();

        this.lblScore = new Label();
        this.point = [];
        this.point.push(new Point());
        this.mapa = new Mapa();
        this.snake = new Snake();

        this.dificult=1;
    }
    createSnake() {
        this.snake.large();
        this.snake.init(this.ctx);
        this.snake.setDir(2);
        var ts = this;
        clearInterval(this.interval);
        this.interval = setInterval(function() {
            ts.update();
        }, 500);
        this.lblScore.init(this.ctx, 10, 10, "0");

        for(var i=0;i<this.dificult;i++){
            if(this.dificult>1){
                this.point.push(new Point());
            }
            var p = this.setNewPoint();
            this.point[i].init(this.ctx, this.snake, p.l, p.t,
                (i==0)?'#4265c7':(i==1)?'#db1630':'#539e3e',
                false,i+1);
        }
    }
    init() {
        this.mapa.init(this.ctx, 30, 30, this.c.width - 30, this.c.height / 2);

        this.btn.init(this.ctx, (this.c.width / 4), (this.c.height / 2) - 20, 60, 40, 'Aceptar');
        this.btn_2.init(this.ctx,((this.c.width/4)*2),(this.c.height/2)-20,60,40,'Dos');
        
        this.b_up.init(this.ctx, (this.c.width / 2) - 30, this.c.height - 160, 60, 40, 'up');
        this.b_rt.init(this.ctx, (this.c.width / 2) - 90, this.c.height - 140, 60, 40, 'rt');
        this.b_bt.init(this.ctx, (this.c.width / 2) - 30, this.c.height - 120, 60, 40, 'bt');
        this.b_lf.init(this.ctx, (this.c.width / 2) + 30, this.c.height - 140, 60, 40, 'lf');
        
        this.createSnake();

        this.click();
        var ts = this;
        clearInterval(this.interval);
        this.interval = setInterval(function() {
            ts.update();
        }, 500);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
        switch (this.state) {
            case 1:
                this.btn.draw();
                this.btn_2.draw();
                break;
            case 2:
                this.mapa.draw();
                this.snake.draw();
                for(var i=0;i<this.dificult;i++){
                    this.point[i].draw();
                }
                this.b_up.draw();
                this.b_rt.draw();
                this.b_bt.draw();
                this.b_lf.draw();
                this.lblScore.draw();
                break;
        }
    }
    update() {
        switch (this.state) {
            case 2:
                this.snake.update();
                for(var i=0;i<this.dificult;i++){
                    this.point[i].update();
                    if (this.point[i].getComido()) {
                        
                        this.point.slice(i,1);
                        this.point.push(new Point());

                        var p = this.setNewPoint();
                        this.point[i].init(this.ctx, this.snake, p.l, p.t,
                                        (i==0)?'#4265c7':(i==1)?'#db1630':'#539e3e',
                                        false,1);
                    }
                }
                this.collitionLimit();
                break;
        }
        this.draw();
        for(var i=0;i<this.dificult;i++){
            this.lblScore.update(this.point[i].getContador());
            if (parseFloat(this.point[i].getContador()) == 2) {
                clearInterval(this.interval);
                var ts = this;
                this.interval = setInterval(function() {
                    ts.update();
                }, 250);
            }
        }
    }
    collitionLimit() {
        if (this.snake.hs[0].getT() < this.mapa.getT()) {
            this.gameOver();
        }
        if (this.snake.hs[0].getL() < this.mapa.getL()) {
            this.gameOver();
        }
        if (this.snake.hs[0].getT() > this.mapa.getH()) {
            this.gameOver();
        }
        if (this.snake.hs[0].getL() > this.mapa.getW()) {
            this.gameOver();
        }
    }
    gameOver() {
        clearInterval(this.interval);
        this.state = 1;
    }
    click() {
        var ts = this;
        this.btn.click(function() {
            ts.state = 2;
            ts.dificult=1;
            ts.createSnake();
            ts.draw();
        });
        this.btn_2.click(function(){
            ts.state=2;
            ts.dificult=2;
            ts.createSnake();
            ts.draw();
        });
        this.b_up.click(function() {
            ts.snake.setDir(1);
        });
        this.b_lf.click(function() {
            ts.snake.setDir(2);
        });
        this.b_bt.click(function() {
            ts.snake.setDir(3);
        });
        this.b_rt.click(function() {
            ts.snake.setDir(4);
        });
    }
    setNewPoint() {
        var l = Math.floor(Math.random() * (((this.c.width - 30) - 30) - 30 + 1) + 30);
        var t = Math.floor(Math.random() * (((this.c.height / 2) - 30) - 30 + 1) + 30);
        l = l - (l % 10);
        t = t - (t % 10);
        return {
            'l': l,
            't': t
        };
    }
}
var g = new Game();
g.init();