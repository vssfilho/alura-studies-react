import PubSub from 'pubsub-js';

export default class ValidateInputComponent {
    publishErrors(arrayErrors){
        for(var i=0; i<arrayErrors.errors.length; i++){
            var error = arrayErrors.errors[i];
            PubSub.publish("erro-validate", error);
        }
    }
}