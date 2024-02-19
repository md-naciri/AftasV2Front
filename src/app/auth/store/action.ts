import { createActionGroup, props  } from "@ngrx/store";


import { BackendErrorInterface } from "../shared/types/backendError.interface";
import { CurrentUserInterface } from "../shared/types/currentUser.interface";
import { LoginRequestInterface } from "../shared/types/loginRequest.interface";
import { RegisterRequestInterface } from "../shared/types/registerRequest.interface";
import { MailRequestInterface } from "../shared/types/mailRequest.interface";
import { ResponseWithDetailsInterface } from "../shared/types/responseWithDetails.interface";



export const authActions = createActionGroup({

    source : 'auth',
    events : {
        Register: props<{request: RegisterRequestInterface}>(),
        'Register Success': props<{response: ResponseWithDetailsInterface}>(),
        'Register Failure': props<{errors: BackendErrorInterface}>(),
    }
})

export const loginActions = createActionGroup({
    source: 'login',
    events :{
        Login: props<{request: LoginRequestInterface}>(),
        'Login Success': props<{currentUser: CurrentUserInterface}>(),
        'Login Failure': props<{errors: BackendErrorInterface}>(),
    }
});

export const verifyEmailActions = createActionGroup({
    source: 'mail',
    events :{
        Mail: props<{request: MailRequestInterface}>(),
        'Mail Success': props<{currentUser: CurrentUserInterface}>(),
        'Mail Failure': props<{errors: BackendErrorInterface}>(),
    }
});

