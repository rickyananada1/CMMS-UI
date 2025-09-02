import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './libs/react-query'
import { ToastProvider } from './context/ToastContext'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
