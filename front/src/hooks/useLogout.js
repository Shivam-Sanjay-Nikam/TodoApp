import { useAuthContext } from './useAuthContext'
import { useTodoContext } from './useTodoContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchTodo } = useTodoContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchTodo({ type: 'SET_TODO', payload: null })
  }

  return { logout }
}