import {
  UNIVERSITY_SECTION_PAGES_ROUTES,
  UNIVERSITY_SECTION_TYPE,
} from "@/src/types/university-section.type";
import style from "@/src/components/Form/form.module.scss";
import Input from "../Input/Input";
import { ICourseData } from "@/src/modules/university/course/modal/ICourse";
import { ISemesterData } from "@/src/modules/university/semester/modal/ISemester";
import Select from "../select/Select";
import { IStudentsData } from "@/src/modules/university/student/modal/IStudents";
import { IFeeStructureData } from "@/src/modules/fees/fees-struct/modal/IFees";
interface FormProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  course?: ICourseData[];
  semester?: ISemesterData[];
  students?:IStudentsData[];
  feeStructure?:IFeeStructureData[],
  type: UNIVERSITY_SECTION_PAGES_ROUTES;
}

export default function Form({
  formData,
  handleChange,
  type,
  onSubmit,
  semester,
  course,
  students,
  feeStructure
}: FormProps) {
  const cou = type === UNIVERSITY_SECTION_TYPE.COURSES;
  const sem = type === UNIVERSITY_SECTION_TYPE.SEMESTERS;
  const sub = type === UNIVERSITY_SECTION_TYPE.SUBJECTS;
  const stu = type === UNIVERSITY_SECTION_TYPE.STUDENTS;
  const fees = type === UNIVERSITY_SECTION_TYPE.FEESTRUCTURE;
 const stufees = type === UNIVERSITY_SECTION_TYPE.STUDENTFEES;



  const filteredSemesters =
    semester?.filter(
      (sem) => Number(sem.course_id) === Number(formData.course_id),
    ) || [];

const selectedFee = feeStructure?.find(
  fee => fee.id === Number(formData.fee_structure_id)
);

const totalamount = Number(selectedFee?.total_fee || 0);
const remaining =
  totalamount - Number(formData.amount_paid || 0);

const totalFee =
   Number(formData.tuition_fee || 0) +
   Number(formData.exam_fee || 0) +
   Number(formData.library_fee || 0) +
   Number(formData.other_fee || 0);

let payment_status = "Pending";
if (remaining <= 0) {
  payment_status = "Paid";
} else if (remaining > 0) {
  payment_status = "Partial";
}

const selectedStudent = students?.find(
  (student) => Number(student.id) === Number(formData.student_id)
);
// console.log("Selected Students",selectedStudent);


const filteredFees = feeStructure?.filter(
  (fee) =>
    fee.course_name === selectedStudent?.course_name &&
    Number(fee.semester_number) ===
      Number(selectedStudent?.semester_number)
);
  return (
    <div className={style["container"]}>
      <h2 className={style["heading"]}>
        {cou && "Add Courses in University Panel"}
        {sem && "Add Semester in  University Panel"}
        {sub && "Add Subject in University Panel"}
        {stu && "Add Students in University  Panel"}
        {fees && "Add Fees Details in University Panal"}
        {stufees && "Add Student Fees Details in University Panal"}
      </h2>

      <form className={style["form"]} onSubmit={onSubmit}>
        {cou && (
          <>
            <div className={style["field"]}>
              <label className={style["label"]}>Course Name</label>
              <Input
                name="course_name"
                value={formData.course_name}
                placeholder="Course Name"
                onChange={handleChange}
                type="text"
                classname={style["input"]}
              />
              <label className={style["label"]}> Choose Course Type</label>
              <div className={style["radio-group"]}>
                <label className={style["radio-label"]}>
                  <input
                    type="radio"
                    name="course_type"
                    value="UG"
                    checked={formData.course_type === "UG"}
                    onChange={handleChange}
                  />
                  UG
                </label>

                <label className={style["radio-label"]}>
                  <input
                    type="radio"
                    name="course_type"
                    value="PG"
                    checked={formData.course_type === "PG"}
                    onChange={handleChange}
                  />
                  PG
                </label>
              </div>
              <label className={style["label"]}>Total Semester</label>
              <Input 
              classname={style["input"]}
              name="total_semesters"
              onChange={handleChange}
              type="number"
              value={Number(formData.total_semesters)}
              placeholder="Enter Total Semester"
              />
            </div>
          </>
        )}
        {sem && (
          <>
            <label className={style["label"]}>Course</label>

            <Select
              name="course_id"
              value={formData.course_id || ""}
              onChange={handleChange}
              classname={style["select"]}
              options={
                course?.map((item) => ({
                  label: `${item.course_name} (${item.course_type})`,
                  value: item.id!,
                })) || []
              }
            />

            <label className={style["label"]}>Semester Number</label>

            <Input
              name="semester_number"
              value={formData.semester_number || ""}
              onChange={handleChange}
              type="number"
              classname={style["input"]}
            />
          </>
        )}
        {sub && (
          <>
            <label className={style["label"]}>Subject Name</label>

            <Input
              name="subject_name"
              value={formData.subject_name || ""}
              onChange={handleChange}
              type="text"
              classname={style["input"]}
            />

            <label className={style["label"]}>Subject Code</label>

            <Input
              name="subject_code"
              value={formData.subject_code || ""}
              onChange={handleChange}
              type="text"
              classname={style["input"]}
            />
            <label className={style["label"]}>Credits</label>
            <Input
              name="credits"
              value={formData.credits || 4}
              onChange={handleChange}
              type="number"
              classname={style["input"]}
            />

            <label className={style["label"]}>Course</label>

            <Select
              name="course_name"
              value={formData.course_name || ""}
              onChange={handleChange}
              classname={style["select"]}
              options={
                course?.map((item) => ({
                  label: item.course_name,
                  value: item.course_name,
                })) || []
              }
            />

            <label className={style["label"]}>Semester</label>

            <Select
              name="semester_id"
              value={formData.semester_id || ""}
              onChange={handleChange}
              classname={style["select"]}
              options={
                semester
                  ?.filter((sem) => sem.course_name === formData.course_name)
                  .map((sem) => ({
                    label: `Semester ${sem.semester_number}`,
                    value: sem.id!,
                  })) || []
              }
            />
          </>
        )}
        {stu && (
          <>
            <label className={style["label"]}>Student Name</label>

            <Input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              type="text"
              classname={style["input"]}
            />

            <label className={style["label"]}>Roll Number</label>

            <Input
              name="roll_number"
              value={formData.roll_number || ""}
              onChange={handleChange}
              type="text"
              classname={style["input"]}
            />

            <label className={style["label"]}>Gender</label>
            <Select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              classname={style["select"]}
              options={[
                {
                  label: "Male",
                  value: "M",
                },
                {
                  label: "Female",
                  value: "F",
                },
              ]}
            />

            <label className={style["label"]}>Course</label>

            <Select
              name="course_id"
              value={formData.course_id || ""}
              onChange={handleChange}
              classname={style["select"]}
              options={
                course?.map((item) => ({
                  label: item.course_name,
                  value: item.id!,
                })) || []
              }
            />

            <label className={style["label"]}>Semester</label>

            <Select
              name="semester_id"
              value={formData.semester_id || ""}
              onChange={handleChange}
              classname={style["select"]}
              options={
                semester
                  ?.filter(
                    (sem) => sem.course_id === Number(formData.course_id),
                  )
                  .map((sem) => ({
                    label: `Semester ${sem.semester_number}`,
                    value: sem.id!,
                  })) || []
              }
            />

            <label className={style["label"]}>Marks</label>

            <Input
              name="marks"
              value={formData.marks || ""}
              onChange={handleChange}
              type="number"
              classname={style["input"]}
            />

            <label className={style["label"]}>Grade Points</label>

            <Input
              name="grade_points"
              value={formData.grade_points || ""}
              onChange={handleChange}
              type="number"
              classname={style["input"]}
            />

            <label className={style["label"]}>Result</label>

            <Select
              name="result"
              value={formData.result || ""}
              onChange={handleChange}
              classname={style["select"]}
              options={[
                {
                  label: "Pass",
                  value: "Pass",
                },
                {
                  label: "Fail",
                  value: "Fail",
                },
              ]}
            />
          </>
        )}

        {fees && (
          <>
            <label className={style["label"]}>Course</label>

            <Select
              name="course_id"
              value={formData.course_id}
              onChange={(e) => {
                handleChange(e);
              }}
              classname={style["select"]}
              options={
                course?.map((item) => ({
                  label: item.course_name,
                  value: item.id!,
                })) || []
              }
            />
            <label className={style["label"]}>Semester</label>
            <Select
              name="semester_id"
              value={formData.semester_id}
              onChange={handleChange}
              classname={style["select"]}
              options={filteredSemesters.map((sem) => ({
                label: `Semester ${sem.semester_number}`,
                value: sem.id!,
              }))}
            />
            <label className={style["label"]}>Tuition Fees</label>
            <Input
              name="tuition_fee"
              onChange={handleChange}
              value={formData.tuition_fee}
              type="number"
              placeholder="Enter Amount of Tuition Fees"
              classname={style["input"]}
            />
            <label className={style["label"]}>Exam Fees</label>
            <Input
              name="exam_fee"
              onChange={handleChange}
              value={formData.exam_fee}
              type="number"
              placeholder="Enter Amount of Exam Fees"
              classname={style["input"]}
            />
            <label className={style["label"]}>Library Fees</label>
            <Input
              name="library_fee"
              onChange={handleChange}
              value={formData.library_fee}
              type="number"
              placeholder="Enter Amount of Libaray Fees"
              classname={style["input"]}
            />
            <label className={style["label"]}>Other Fees</label>
            <Input
              name="other_fee"
              onChange={handleChange}
              value={formData.other_fee}
              type="number"
              placeholder="Enter Amount of Other Fees"
              classname={style["input"]}
            />
            <label className={style["label"]}>Total Fees</label>
            <Input
              name="total_fee"
              onChange={handleChange}
              value={Number(totalFee)} 
              type="number"
              placeholder="Enter Amount of Total Fees"
              classname={style["input"]}
            />
          </>
        )}

      {stufees && (
  <>
    <label className={style["label"]}>
      Student
    </label>
    <Select
      name="student_id"
      value={formData.student_id || ""}
      onChange={handleChange}
      classname={style["select"]}
      options={
        students?.map((student) => ({
          label: `${student.name} (${student.roll_number})`,
          value: student.id!,
        })) || []
      }
    />

    <label className={style["label"]}>
      Fee Structure
    </label>
    <Select
  name="fee_structure_id"
  value={formData.fee_structure_id || ""}
  onChange={handleChange}
  classname={style["select"]}
  options={
    filteredFees?.map((fee) => ({
      label: `${fee.course_name} - Semester ${fee.semester_number} - ₹${fee.total_fee}`,
      value: fee.id!,
    })) || []
  }
/>

    <label className={style["label"]}>
      Amount Paid
    </label>
    <Input
      name="amount_paid"
      value={formData.amount_paid}
      onChange={handleChange}
      type="number"
      placeholder="Enter Amount Paid"
      classname={style["input"]}
    />

    <label className={style["label"]}>
      Payment Date
    </label>
    <Input
      name="payment_date"
      value={formData.payment_date}
      onChange={handleChange}
      type="date"
      classname={style["input"]}
    />

    <label className={style["label"]}>
      Due Amount
    </label>
    <Input
      name="due_amount"
      value={remaining}
      type="number"
      onChange={handleChange}
      classname={style["input"]}
    />

    <label className={style["label"]}>
      Payment Status
    </label>
    <Input
      name="payment_status"
      value={payment_status}
      type="text"
      onChange={handleChange}
      classname={style["input"]}
      placeholder="Enter Payment Status"
    />
  </>
)}

        <button className={style["button"]} type="submit">
          {cou && "Add Course"}
          {sem && "Add Semester"}
          {sub && "Add Subjects"}
          {stu && "Add Students"}
          {fees && "Add Fees Record"}
          {stufees && "Add Student Fees Record"}
        </button>
      </form>
    </div>
  );
}
