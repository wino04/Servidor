export const validateSchema = (schema) => (req,res,next) => {//constructor de interacción con el server,
    //respuestas a las preguntas que haga el cliente y seguir.
    try{//OPERACION DE CUIDADO
        schema.parse(req.body);/*si el esquema cumple con el esquema accediendo al cuerpo de una solicitud
        HTTP*/
        //contiene los datos enviados en el cuerpo de una solicitud POST
        //estructura y el tipo de datos que se esperan en el req.body
        /*Es una variable que representa
        algun tipo de esquema de datos. Este esquema podría definir la estructura y el tipo de datos que se
        esperan en req.body.*/
        next();//entonces sigue
    }catch(error){//atrapa el error si dice que no
        return res //retorno o devuelve una respuesta con
        .status(400)//un estutus de error 400
        .json({message:error.errors.map((error) => error.message)});//todos los .json son del server con
        //un error en mensaje
    }
};