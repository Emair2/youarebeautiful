//我想存多一个版本啊阿啊
//面部精细识别
// The actual helpful link: https://www.npmjs.com/package/@tensorflow-models/face-landmarks-detection
//2

// let faces;
// // let detector;
let model;
let faces;

const w = 640;
const h = 480;

function setup() {
    createCanvas(w, h);

    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();

    loadFaceModel();

    colorMode(HSB, 255);
}


function draw() {
    background(200);
    if (capture.loadedmetadata && model !== undefined) {
        getFaces();
    }

    push();
        translate(w, 0);
        scale(-1, 1);
        image(capture, 0, 0);
    pop();

    noStroke();
    if(faces !== undefined) {
        for(const f of faces) {

            let h = 0;
          
          //嘴巴内轮廓
          const month = [61,191,80,81,82,13,312,311,310,415,291,324,318,402,317,14,87,178,88,95,61]
          //左眼
          const lefteye = [33,246,161,160,159,158,157,173,133,155,154,153,145,144,163,7,33]
          //右眼
          const righteye = [362,398,384,385,386,387,388,466,263,249,390,373,374,380,381,382,362]
          //鼻子
          const nose = [122,6,351,419,456,363,360,279,358,327,326,2,97,98,129,49,131,134,236,196,122]
          //左鼻孔
          const leftNostrils = [79,166,59,75,60,20,238,79]
          //右鼻孔
          const rightNostrils = [309,392,289,305,290,250,456,309]
          //嘴唇/外圈
          const lips = [0,267,269,270,409,291,375,321,405,314,17,84,181,91,146,61,185,40,39,37]
          //左眉毛
          const leftEyebrows = [107,55,65,52,53,46,124,70,63,105,66,107]
          //右眉毛
          const rightEyebrows = [336,296,334,293,300,353,276,283,282,295,285,336]
          //外轮廓
          const face = [151,337,299,333,298,301,368,264,447,366,401,435,367,364,394,395,369,396,175,171,140,170,169,135,138,215,177,137,227,34,139,71,68,104,69,108,151]
          //左边眼球
          const leftEyeball = [160,159,158,153,145,144,160]
          //右边眼球
          const rightEyeball = [385,386,387,373,374,380,385]
          
          
          
          //嘴巴内轮廓
        for (let i = 0; i< month.length; i++){
          const mon = f.scaledMesh[month[i]];
          fill(252,244,14);
          ellipse(mon[0],mon[1],3)
        }
            //左眼
          for (let i = 0; i< lefteye.length; i++){
          const le = f.scaledMesh[lefteye[i]];
          fill(0);
          ellipse(le[0],le[1],3)
        }
            
          //右眼
          for (let i = 0; i< righteye.length; i++){
          const re = f.scaledMesh[righteye[i]];
          fill(0);
          ellipse(re[0],re[1],3)
        }
          
          //鼻子
          for (let i = 0; i< nose.length; i++){
          const no = f.scaledMesh[nose[i]];
          fill(0);
          ellipse(no[0],no[1],3)
        }
          
          //左鼻孔
          for (let i = 0; i< leftNostrils.length; i++){
          const lns = f.scaledMesh[leftNostrils[i]];
          fill(0);
          ellipse(lns[0],lns[1],3)
        }
          
          //右鼻孔
          for (let i = 0; i< rightNostrils.length; i++){
          const rns = f.scaledMesh[rightNostrils[i]];
          fill(0);
          ellipse(rns[0],rns[1],3)
        }
          
          
          //嘴唇
          for (let i = 0; i< lips.length; i++){
          const lip = f.scaledMesh[lips[i]];
          fill(0);
          ellipse(lip[0],lip[1],3)
        }
          
          //左眉毛
          for (let i = 0; i< leftEyebrows.length; i++){
          const lb = f.scaledMesh[leftEyebrows[i]];
          fill(0);
          ellipse(lb[0],lb[1],3)
        }
          
          //右眉毛
          for (let i = 0; i< rightEyebrows.length; i++){
          const rb = f.scaledMesh[rightEyebrows[i]];
          fill(0);
          ellipse(rb[0],rb[1],3)
        }
          
          //外轮廓
          for (let i = 0; i< face.length; i++){
          const fa = f.scaledMesh[face[i]];
          fill(0);
          ellipse(fa[0],fa[1],3)
        }
          
          //左边眼球
          for (let i = 0; i< leftEyeball.length; i++){
          const lb = f.scaledMesh[leftEyeball[i]];
          fill(0);
          ellipse(lb[0],lb[1],3)
          }
          
          //右边眼球
          for (let i = 0; i< rightEyeball.length; i++){
          const rb = f.scaledMesh[rightEyeball[i]];
          fill(0);
          ellipse(rb[0],rb[1],3)
          }
          
          
        }
    }
}

function drawSilhouette(f) {
    beginShape();
    for (const kp of f.annotations.silhouette) {
        const keyPoint = createVector(kp[0], kp[1]);
        vertex(keyPoint.x, keyPoint.y);
    }
    endShape(CLOSE);
}

function drawEyes(f) {

    textSize(4);
    noStroke();
    for (const kp of f.annotations.leftEyeLower0) {
        fill(0, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("l0", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeLower1) {
        fill(37, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("l1", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeLower2) {
        fill(74, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("l2", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeLower3) {
        fill(111, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("l3", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeUpper0) {
        fill(148, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("u0", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeUpper1) {
        fill(185, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("u1", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeUpper2) {
        fill(222, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("u2", kp[0], kp[1]);
    }
}


async function loadFaceModel() {
    model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)

    console.log(model);
}

async function getFaces() {
    const predictions = await model.estimateFaces({
        input: document.querySelector("video"),
        returnTensors: false,
        flipHorizontal: true,
        predictIrises: false // set to 'false' if sketch is running too slowly
    })

    if (predictions.length === 0) {
        faces = undefined;
    } else {
        faces = predictions;
    }
}