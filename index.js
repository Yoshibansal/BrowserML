//since training model takes varient time we define a async funtion
async function doTraining(model){
    const history =
          await model.fit(xs, ys,
                { epochs: 500,
                  callbacks:{
                      onEpochEnd: async(epoch, logs) =>{
                          var temp = "Epoch: " + epoch
                                    + "  Loss: " + logs.loss
                          console.log(temp);
                          document.getElementById("boxed").innerHTML = temp;
                      }
                  }
                });
}



//Disabled button until model is trained successfully
var button1 = document.getElementById("btn");
button1.disabled = true;




////////////////////////////// MODEL //////////////////////////////


//model architecture
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));



//compile
model.compile({loss:'meanSquaredError',
               optimizer:'sgd'});

model.summary();



//defining data
const xs = tf.tensor2d([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], [6, 1]);
const ys = tf.tensor2d([-3.0, -1.0, 2.0, 3.0, 5.0, 7.0], [6, 1]);


///////////////////////////////////////////////////////////////////




//training and enabling the button after it
doTraining(model).then(() => {
    document.getElementById("process").innerText = "Model is ready to predict new values";
    button1.disabled = false;
});;




//click the button on a press of enter in input field
document.getElementById("testInput")
    .addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            document.getElementById("btn").click();
        }
    });



    
//predict function
function predict(){
    var input_val = parseInt(document.getElementById("testInput").value);
    var output_val = model.predict(tf.tensor2d([input_val], [1,1]));
    document.getElementById("result").innerHTML += "X=" + input_val + ", Y=" + output_val.arraySync() + "\n";
}
