const AddForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addnew}>
        <div>
          Name: <input value={props.namevalue} onChange={props.handlename}/><br />
          Number: <input value={props.numbervalue} onChange={props.handlenumber}/>
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  );
} 

export default AddForm;