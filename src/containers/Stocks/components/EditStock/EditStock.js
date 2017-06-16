import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { saveStock } from '../../../../reducers/stockReducer'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Save from 'material-ui/svg-icons/content/save'

const renderInputMaterialUI = ({input, label, meta: {touched, error}, ...custom}) =>
  <div>
    <TextField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  </div>

const buttonStyleContainers = {
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'flex-end'
}

class StockInsert extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderField (fieldConfig) {
    return (
      <Field
        name={fieldConfig.name}
        label={fieldConfig.label}
        component={renderInputMaterialUI} />
    )
  }

  onSubmit (data) {
    data.lastPriceTimeStamp = '-'
    data.lastPrice = 1
    data.highestPrice = 1
    data.currentTreshold = 0
    data.gain = 1
    this.props.saveStock(data, this.props.user)
  }

  render () {
    const {handleSubmit, user} = this.props
    if (!user) {
      return <div>Not logged id</div>
    }

    return (
      <div style={buttonStyleContainers} >
        {/* <h3>Add new stock</h3> */}
        <form
          onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name='symbol'
            label='Symbol'
            component={renderInputMaterialUI}
          />
          <Field
            name='purchasePrice'
            label='Purchase Price'
            component={renderInputMaterialUI}
          />
          <Field
            name='threshold'
            label='Threshold'
            component={renderInputMaterialUI}
            defaultValue={4}
          />
          <FloatingActionButton type='submit'>
            <Save />
          </FloatingActionButton>
        </form>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}
  // const requiredFields = ['symbol', 'shares', 'purchasePrice', 'submit']
  const requiredFields = ['symbol', 'purchasePrice', 'submit']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

StockInsert.propTypes = {}
StockInsert.defaultProps = {}

const mapStateToProps = store => {
  return {
    user: store.auth.user,
    selectedStock: store.stocks.selectedStock
  }
}

// kind of hack how to connect redux-form and redux(connect) - you have to write it on 2 lines
// 1) do reduxForm and 2nd connect
StockInsert = reduxForm({
  form: 'StockInsertForm',
  validate
})(StockInsert)

StockInsert = connect(mapStateToProps, {saveStock})(StockInsert)

export default StockInsert
