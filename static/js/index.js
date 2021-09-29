//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
	//alert("led on");
	console.log("led on");
	//document.getElementById("sensor").innerHTML="led on";
	message = new Paho.MQTT.Message("ON");
    	message.destinationName = "elitearevalo31@gmail.com/t1";
    	client.send(message);
  
}
function LED1_Off(){	
	//alert("led off");
	console.log("led off");
	message = new Paho.MQTT.Message("OFF");
    	message.destinationName = "elitearevalo31@gmail.com/t1";
    	client.send(message);
	//document.getElementById("sensor").innerHTML="led off";
}
function LED1_One() {
	//alert("led one");
	console.log("led one");
	//document.getElementById("sensor").innerHTML="led one";
	message = new Paho.MQTT.Message("ONE");
    	message.destinationName = "elitearevalo31@gmail.com/t1";
    	client.send(message);
  
}





// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "elitearevalo31@gmail.com",
    password: "alex31%unachtele",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("elitearevalo31@gmail.com/t2");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "elitearevalo31@gmail.com/t1";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
    var b = message.payloadString.split("-")
    document.getElementById("sensor1").innerHTML=b[0];
    document.getElementById("sensor2").innerHTML=b[1];
    document.getElementById("sensor3").innerHTML=b[2];
  }
  
