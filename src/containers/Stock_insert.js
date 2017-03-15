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
  margin: 12,
};

const renderInputMaterialUI = ({input, label, meta: {touched, error}, ...custom}) =>
  <div>
    <TextField floatingLabelText={label}
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
      <div key={fieldConfig.name}>
        <Field
          name={fieldConfig.name}
          label={fieldConfig.label}
          component={renderInputMaterialUI}/>
      </div>
    )
  }

  onSubmit(data) {
    console.log('StockInsert',data)
    this.props.saveStock(data, this.props.user.providerData[0].uid);
  }


  render() {
    const {handleSubmit, user} = this.props;
    if (!user) {
      return <div>Not logged id</div>
    }

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h3>Add new stock</h3>

          {_.map(FIELDS, this.renderField)}

          <div>
            <RaisedButton label="Submit" primary={true} style={style} type="submit"/>
          </div>
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
    user: store.auth.user
  }
}

// kind of hack how to connect redux-form and redux(connect) - you have to write it on 2 lines
// 1) do reduxForm and 2nd connect
StockInsert = reduxForm({
  form: 'StockInsertForm'
  , validate
})(StockInsert);

StockInsert = connect(mapStateToProps, {saveStock})(StockInsert);

export default StockInsert;


