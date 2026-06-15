import React, { createContext, useContext, useReducer, useCallback } from 'react'
import { INITIAL_PATIENTS } from '../data/patients.js'

const Ctx = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_VITALS':
      return {
        ...state,
        patients: state.patients.map(p =>
          p.id === action.id ? { ...p, vitals: action.vitals } : p
        ),
      }
    case 'ADD_ALERT':
      return {
        ...state,
        alerts: [action.alert, ...state.alerts].slice(0, 500),
      }
    case 'SET_THRESHOLD':
      return {
        ...state,
        patients: state.patients.map(p =>
          p.id === action.id
            ? {
                ...p,
                thresholds: {
                  ...p.thresholds,
                  [action.vital]: {
                    ...p.thresholds[action.vital],
                    [action.key]: action.value === '' ? null : Number(action.value),
                  },
                },
              }
            : p
        ),
      }
    case 'ADD_PATIENT':
      return { ...state, patients: [...state.patients, action.patient] }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    patients: INITIAL_PATIENTS,
    alerts: [],
  })

  const updateVitals  = useCallback((id, vitals) => dispatch({ type: 'UPDATE_VITALS', id, vitals }), [])
  const addAlert      = useCallback((alert)      => dispatch({ type: 'ADD_ALERT', alert }), [])
  const setThreshold  = useCallback((id, vital, key, value) => dispatch({ type: 'SET_THRESHOLD', id, vital, key, value }), [])
  const addPatient    = useCallback((patient)    => dispatch({ type: 'ADD_PATIENT', patient }), [])

  return (
    <Ctx.Provider value={{ state, updateVitals, addAlert, setThreshold, addPatient }}>
      {children}
    </Ctx.Provider>
  )
}

export const useApp = () => useContext(Ctx)
