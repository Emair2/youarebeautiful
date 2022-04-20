// https://kylemcdonald.github.io/cv-examples/

var capture;
var previousPixels;
var w = 640;
var h = 440;


//字母雨前提
var threshold = 40; // lower threshold means letters will only stop on very dark spots
const fallRate = 1; // higher == faster letters
var fallingLetters = [];


function setup() {
  capture = createCapture(
    {
      audio: false,
      video: {
        width: w,
        height: h,
      },
    },
    function () {
      console.log("capture ready.");
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.size(w, h);
  createCanvas(innerWidth, innerHeight);
  capture.hide();

  //文字尺寸
  const size = 80;
  textSize(size);

  //文字内容
  let sourceText = [
    "I keep falling, I keep being reborn",
  ];


  for (let i = 0; i < sourceText.length; i++) {
    let currentLetter = new FallingLetter(sourceText[i], i * size, 40);
    fallingLetters.push(currentLetter);
  }

}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}


function copyImage(src, dst) {
  var n = src.length;
  if (!dst || dst.length != n) dst = new src.constructor(n);
  while (n--) dst[n] = src[n];
  return dst;
}

function draw() {
  background(0);
  capture.loadPixels();
  var total = 0;
  if (capture.pixels.length > 0) {
    // don't forget this!
    if (!previousPixels) {
      previousPixels = copyImage(capture.pixels, previousPixels);
    } else {
      // var w = capture.width,
      //   h = capture.height;
      var i = 0;
      var pixels = capture.pixels;
      var thresholdAmount = (select("#thresholdAmount").value() * 255) / 100;
      thresholdAmount *= 3; // 3 for r, g, b
      push();
      for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
          // calculate the differences 计算数值
          var rdiff = Math.abs(pixels[i + 0] - previousPixels[i + 0]);
          var gdiff = Math.abs(pixels[i + 1] - previousPixels[i + 1]);
          var bdiff = Math.abs(pixels[i + 2] - previousPixels[i + 2]);
          // copy the current pixels to previousPixels
          previousPixels[i + 0] = pixels[i + 0];
          previousPixels[i + 1] = pixels[i + 1];
          previousPixels[i + 2] = pixels[i + 2];
          var diffs = rdiff + gdiff + bdiff;
          var output = 180;
          if (diffs > thresholdAmount) {
            output = 30000;
            total += diffs;
          }
          pixels[i++] = output;
          pixels[i++] = output;
          pixels[i++] = output;
          // also try this:
          // pixels[i++] = rdiff;
          // pixels[i++] = gdiff;
          // pixels[i++] = bdiff;
          i++; // skip alpha
        }

      }
    }
    push();
    scale(setScale(),setScale());
    translate(w, 0);
    scale(-1, 1);
    image(capture, 0, 0);
    pop();

  }

  //////////// add anything else you want below this line

  //摇晃
  rectMode(CENTER);
  //translate(width / 10, height / 10);
  translate(p5.Vector.fromAngle(millis() / 9000, 6));


  //渲染效果
  blendMode(DIFFERENCE);
  strokeWeight(20);
  stroke(255, 255, 245);




  // need this because sometimes the frames are repeated
  if (total > 0) {
    select("#motion").elt.innerText = total;
    capture.updatePixels();
    push();
    scale(setScale(), setScale())
    image(capture, 0, 0, 740, 580);
    pop()
  }
  for (let i = 0; i < fallingLetters.length; i++) {
    if (total > 3000) {
      fallingLetters[i].y++;


      // loop through all the fallingLetters
      for (let i = 0; i < fallingLetters.length; i++)
        if (fallingLetters[i].y >= h) {
          fallingLetters[i].y = 0;
        }

        // else, the fallingLetter keeps falling
        else {
          fallingLetters[i].y += fallRate;
        }
    }


    // draw the fallingLetters to the screen
    push();
    scale(setScale(), setScale());
    for (let f of fallingLetters) {
      fill(0, 255, 0);
      text(f.char, f.x, f.y + 300);

      strokeWeight(0);
      textStyle(ITALIC);
      textSize(21);
      text('People always think they are affectionate.', 30, 40);
      text('Seeing a bunny and saying it is cute,', 240, 60);
      text('Seeing a lion and saying it is scary.', 60, 80);
      text('Never knew how they bled and loved each other', 160, 100);
      text('On the night of the storm.', 20, 120);
      text('To free and entangle.', 380, 140);
      text('Before building an ego，', 80, 160);
      text('Destroy it.', 500, 180);
      text('Like the beautiful bodies of those who die early.', 40, 200);
      text('Roses at the head, desire seems so, ', 280, 220);
      text('Decayed.', 80, 240);
      text('Without ever having gotten，', 170, 260);
      text('Even a joyful night,', 300, 280);
      text('Or a glorious morning.', 20, 300);
      text('Come and join my dream，', 380, 320);
      text('All are builders, stealers, spotters.', 200, 340);
      text('We will be born together, climax together, ', 40, 360);
      text('Be dark together, be bright together, ', 250, 380);
      text('And die together.', 120, 400);

      //字母雨颜色参数
      fill(2000, 26, 1000);
      let red = random(2000);
      let g = random(79);
      let b = random(4000);

    }
    //字母雨大小参数
    textSize(35);
    textStyle(BOLD);
    //text('Font Style Bold', 10, 65);
    let red = random(0);
    let g = random(0);
    let b = random(0);

    //fill (red,g,b); rgb, colors
    //fill(25, 70, 10);

    //字母雨位置参数
    text(fallingLetters[i].char, fallingLetters[i].x + 37, fallingLetters[i].y);

  }
  pop();
}



class FallingLetter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
  }
}


function setScale() {
  if (innerWidth / w >= innerHeight / h) {
    return innerWidth / w;
  }
  else {
    return innerHeight / h;
  }
}