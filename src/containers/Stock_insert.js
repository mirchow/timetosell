import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { saveStock } from "../reducers/stockReducer";

const FIELDS = {
  symbol: {
    name: 'symbol',
    label: 'Symbol'
  },
  shares: {
    name: 'shares',
    label: 'Amount of shares'
  },
  purchasePrice: {
    name: 'purchasePrice',
    label: 'Purchase price'
  }
}

const style = {
  margin: 10,
};

const renderInputMaterialUI = ({input, label, meta: {touched, error}, ...custom}) =>
  <div>
    <TextField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  </div>


class StockInsert extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  renderField(fieldConfig) {
    return (
      <Field
        name={fieldConfig.name}
        label={fieldConfig.label}
        component={renderInputMaterialUI}/>
    )
  }

  onSubmit(data) {
    console.log('StockInsert',data)
    this.props.saveStock(data, this.props.user);
  }


  render() {
    const {handleSubmit, user } = this.props;
    const selectedStock = this.props.selectedStock ? this.props.selectedStock : {}
    if (!user) {
      return <div>Not logged id</div>
    }

    return (
      <div>
        <h3>Add new stock</h3>
        <form
          style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}
          onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="symbol"
            label="Symbol"
            input={{value: selectedStock.symbol}}
            component={renderInputMaterialUI}
          />
          <Field
            name="purchasePrice"
            label="Purchase Price"
            input={{value: selectedStock.purchasePrice}}
            component={renderInputMaterialUI}
          />

            <RaisedButton label="Submit" primary={true} style={style} type="submit"/>
        </form>
      </div>
    );
  }

}

function validate(values) {
  const errors = {}
  const requiredFields = ['symbol', 'shares', 'purchasePrice', 'submit']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}


StockInsert.propTypes = {};
StockInsert.defaultProps = {};


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
})(StockInsert);

StockInsert = connect(mapStateToProps, {saveStock})(StockInsert);

export default StockInsert;


