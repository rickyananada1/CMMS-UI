import { useState } from 'react'

const useSpareParts = () => {
  const initialValue = [{ sparepart_id: '', remark: '', quantity: '', description: '' }]

  const [textFields, setTextFields] = useState(initialValue)

  const handleAddTextField = () => {
    const newTextField = { sparepart_id: '', remark: '', quantity: '', description: '' }
    setTextFields([...textFields, newTextField])
  }

  const handleRemoveTextField = (index) => {
    const updatedTextFields = textFields.filter((_, i) => i !== index)
    setTextFields(updatedTextFields)
  }

  const setChange = (index, event, data) => {
    // const updatedTextFields = [...textFields]
    // updatedTextFields[index].asset = event.value
    // setTextFields(updatedTextFields)
    console.log(data)
  }

  const setFieldValue = (index, event) => {
    const updatedTextFields = [...textFields]
    updatedTextFields[index].sparepart_id = event.value
    updatedTextFields[index].description = 'desc ' + index
    setTextFields(updatedTextFields)
    console.log(event.value)
  }

  return {
    textFields,
    initialValue,
    setTextFields,
    handleAddTextField,
    handleRemoveTextField,
    setChange,
    setFieldValue,
  }
}

export default useSpareParts
