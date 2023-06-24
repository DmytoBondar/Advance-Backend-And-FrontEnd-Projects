import { IAcademicSemester } from '../acadamicSemester/acadamicSemester.interface';
import { User } from './users.model'

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 }
  )
    .sort(
      {
        createdAt: -1
      }
    )
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
}

export const generateStudentId = async (academicSemester: IAcademicSemester | null): Promise<string | undefined> => {
  const lastStudent = (await findLastStudentId() || (0).toString().padStart(5, '0'));

  let IncrementId = parseInt(lastStudent + 1).toString().padStart(5, '0');
  if(academicSemester){
    return IncrementId = `${academicSemester.year.substring(2)}${academicSemester.code}${IncrementId}`
  }
}