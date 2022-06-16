import { IAuth, IAuthState } from '../../interfaces/index'
type AuthAction = { type: 'AUTH_LOGIN', payload: IAuth } | { type: 'SET_PLAYERS', payload: IAuth[] }

export const authReducer = (state: IAuthState, action: AuthAction): IAuthState => {
    console.log({ state, action })
    switch (action.type) {
        case 'AUTH_LOGIN':
            return {
                ...state,
                auth: action.payload
            }

        case 'SET_PLAYERS':
            return {
                ...state,
                players: action.payload
            }

        default:
            return state
    }
}
