import { useState } from 'react'

const useToolsForm = () => {
  const initialValue = [
    {
      task_id: '',
      tool: '',
      description: '',
      quantity: 0,
      unit_cost: null,
      line_cost: 0,
    },
  ]
  const [textFields, setTextFields] = useState(initialValue)

  const handleAddTextField = () => {
    const newTextField = {
      task_id: '',
      tool: '',
      description: '',
      quantity: 0,
      unit_cost: null,
      line_cost: 0,
    }
    setTextFields([...textFields, newTextField])
  }

  const handleRemoveTextField = (index) => {
    const updatedTextFields = textFields.filter((_, i) => i !== index)
    setTextFields(updatedTextFields)
  }

  return { initialValue, textFields, handleAddTextField, handleRemoveTextField }
}

export default useToolsForm
