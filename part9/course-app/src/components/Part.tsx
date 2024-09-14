import { CoursePart } from "../types";

const Part = ({ coursePart } : { coursePart: CoursePart }) => {

  const showExclusiveParts = (part: CoursePart) => {
    switch (part.kind) {
      case 'basic':
        return (<p>{part.description}</p>)
      case 'group':
        return (<p>project exercises {part.groupProjectCount}</p>)
      case 'background':
        return (
          <>
            <p>{part.description}</p>
            <p>{part.backgroundMaterial}</p>
          </>
        )
      case 'special':
        return (
          <p>
            required skills: {part.requirements.join(', ')}
          </p>
        )
      default:
        break;
    }
  }

  return (
    <div>
      <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
      {showExclusiveParts(coursePart)}
    </div>
  );
};

export default Part;