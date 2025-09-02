import { useState } from 'react'

const useMaterialsForm = () => {
  const initialValue = [
    {
      task_id: '',
      item: '',
      description: '',
      quantity: 0,
      issue_unit: '',
      unit_cost: null,
      line_cost: 0,
      storeroom: null,
    },
  ]
  const [textFields, setTextFields] = useState(initialValue)

  const handleAddTextField = () => {
    const newTextField = {
      task_id: '',
      item: '',
      description: '',
      quantity: 0,
      issue_unit: '',
      unit_cost: null,
      line_cost: 0,
      storeroom: null,
    }
    setTextFields([...textFields, newTextField])
  }

  const handleRemoveTextField = (index) => {
    const updatedTextFields = textFields.filter((_, i) => i !== index)
    setTextFields(updatedTextFields)
  }

  return { initialValue, textFields, handleAddTextField, handleRemoveTextField }
}

export default useMaterialsForm
