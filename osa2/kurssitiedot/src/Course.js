const Part = (props) => {
    return (
        <>
        <p>{props.part.name} {props.part.exercises}</p>
        </>
    )
}

const Header = (props) => {
    return (
        <>
        <h2>{props.name}</h2>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
        </div>
    )
}

const Total = ({ parts }) => {
    let total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <div>
        <p><b>Number of exercises {total}</b></p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
        </div>
    );
}

export default Course;