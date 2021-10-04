//https://www.eclipse.org/paho/clients/js/
function LED1_On() {
  
  console.log("Pedir Registro");

  message = new Paho.MQTT.Message("REGISTRO1");
      message.destinationName = "elitearevalo31@gmail.com/t1";
      client.send(message);
  //document.getElementById("sensor").innerHTML="led off";
  
}
function LED1_Off(){

  console.log("Pedir Registro");

  message = new Paho.MQTT.Message("REGISTRO2");
      message.destinationName = "elitearevalo31@gmail.com/t1";
      client.send(message);
  //document.getElementById("sensor").innerHTML="led off";
  
}

function Boton_3(){  
  //alert("led off");
  console.log("Pedir Registro");

  message = new Paho.MQTT.Message("REGISTRO");
      message.destinationName = "elitearevalo31@gmail.com/t1";
      client.send(message);
  //document.getElementById("sensor").innerHTML="led off";
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
    
    var Mensaje=message.payloadString;//Se guarda el mensaje en una variable
    var Registro=Mensaje.split('_')

    if (Registro[0]==("R1")){//Cuando se conecta por primera vez a la tarjeta
      document.getElementById("Historial").innerHTML=Registro[1];//Muestra un mensaje de recibido en la web
    }
    if (Registro[0]==("R2")){//Cuando se conecta por primera vez a la tarjeta
      document.getElementById("Historial").innerHTML=Registro[1];//Muestra un mensaje de recibido en la web
    }

    var Sensores=Mensaje.split(',');//Divide el formato en que llegan los valores a razón del espacio en blanco
    document.getElementById("sensor1").innerHTML=Sensores[0];//Muestra el primer valor en la etiqueta
    document.getElementById("sensor2").innerHTML=Sensores[1];//Muestra el segundo valor en la etiqueta
  }
