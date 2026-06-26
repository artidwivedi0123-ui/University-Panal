import {
  UNIVERSITY_SECTION_PAGES_ROUTES,
  UNIVERSITY_SECTION_TYPE,
} from "@/src/types/university-section.type";
import style from "@/src/components/Form/form.module.scss";
import Input from "../Input/Input";
import { ICourseData, ICourseEnum } from "@/src/modules/university/course/modal/ICourse";
import { ISemesterData } from "@/src/modules/university/semester/modal/ISemester";
import Select from "../select/Select";
import { IStudentsData } from "@/src/modules/university/student/modal/IStudents";
import { IFeeStructureData } from "@/src/modules/fees/fees-struct/modal/IFees";
import { useTranslations } from "next-intl";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
interface FormProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  course?: ICourseData[];
  semester?: ISemesterData[];
  students?: IStudentsData[];
  feeStructure?: IFeeStructureData[];
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
  feeStructure,
}: FormProps) {
  const cou = type === UNIVERSITY_SECTION_TYPE.COURSES;
  const sem = type === UNIVERSITY_SECTION_TYPE.SEMESTERS;
  const sub = type === UNIVERSITY_SECTION_TYPE.SUBJECTS;
  const stu = type === UNIVERSITY_SECTION_TYPE.STUDENTS;
  const fees = type === UNIVERSITY_SECTION_TYPE.FEESTRUCTURE;
  const stufees = type === UNIVERSITY_SECTION_TYPE.STUDENTFEES;
  const studDetail = type === UNIVERSITY_SECTION_TYPE.STUDENTDETAIL;
  const formTrans   = useTranslations(TRANSLATIONSAPPCONSTANTS.UNIVERSITYFORM);

  const filteredSemesters =
    semester?.filter(
      (sem) => Number(sem.course_id) === Number(formData.course_id),
    ) || [];

  const selectedFee = feeStructure?.find(
    (fee) => fee.id === Number(formData.fee_structure_id),
  );

  const totalamount = Number(selectedFee?.total_fee || 0);
  const remaining = totalamount - Number(formData.amount_paid);

  const totalFee =
    Number(formData.tuition_fee) +
    Number(formData.exam_fee) +
    Number(formData.library_fee) +
    Number(formData.other_fee);

  let payment_status = "Pending";
  if (remaining <= 0) {
    payment_status = "Paid";
  } else if (remaining > 0) {
    payment_status = "Partial";
  }

  const selectedStudent = students?.find(
    (student) => Number(student.id) === Number(formData.student_id),
  );

  const filteredFees = feeStructure?.filter(
    (fee) =>
      fee.course_name === selectedStudent?.course_name &&
      Number(fee.semester_number) === Number(selectedStudent?.semester_number),
  );
  return (
    <div className={style["container"]}>
      <h2 className={style["heading"]}>
        {cou &&  formTrans(TRANSLATIONSAPPCONSTANTS.ADDCOURSETITLE)}
        {sem && formTrans(TRANSLATIONSAPPCONSTANTS.ADDSEMESTERTITLE)}
        {sub &&  formTrans(TRANSLATIONSAPPCONSTANTS.ADDSUBJECTTITLE)}
        {stu && formTrans(TRANSLATIONSAPPCONSTANTS.ADDSTUDENTSTITLE)}
        {fees &&  formTrans(TRANSLATIONSAPPCONSTANTS.ADDSFEESDETAILSTITLE)}
        {stufees &&  formTrans(TRANSLATIONSAPPCONSTANTS.ADDSTUDENTFEESTITLE)}
        {studDetail &&  formTrans(TRANSLATIONSAPPCONSTANTS.ADDSTUDETAILTITLE)}
      </h2>

      <form className={style["form"]} onSubmit={onSubmit}>
        {cou && (
          <>
            <div className={style["field"]}>
              <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.COURSENAME)}</label>
              <Input
                name="course_name"
                value={formData.course_name}
                placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERCOURSENAME)}
                onChange={handleChange}
                type="text"
                classname={style["input"]}
              />
              <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSECOURSETYPE)}</label>
              <div className={style["radio-group"]}>
                <label className={style["radio-label"]}>
                  <input
                    type="radio"
                    name="course_type"
                    value={ICourseEnum.UG}
                    checked={formData.course_type === ICourseEnum.UG}
                    onChange={handleChange}
                  />
                  {ICourseEnum.UG}
                </label>
                <label className={style["radio-label"]}>
                  <input
                    type="radio"
                    name="course_type"
                    value={ICourseEnum.PG}
                    checked={formData.course_type === ICourseEnum.PG}
                    onChange={handleChange}
                  />
                  {ICourseEnum.PG}
                </label>
              </div>
              <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.TOTALSEMESTERS)}</label>
              <Input
                classname={style["input"]}
                name="total_semesters"
                onChange={handleChange}
                type="number"
                value={Number(formData.total_semesters)}
                placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERTOTALSEM)}
              />
            </div>
          </>
        )}
        {sem && (
          <>
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSECOURSE)}</label>

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

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSESEMESTER)}</label>

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
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.SUBJECTNAME)}</label>

            <Input
              name="subject_name"
              value={formData.subject_name || ""}
              onChange={handleChange}
              type="text"
              classname={style["input"]}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERSUBJECT)}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.SUBJECTCODE)}</label>

            <Input
              name="subject_code"
              value={formData.subject_code || ""}
              onChange={handleChange}
              type="text"
              classname={style["input"]}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERSUBJECTCODE)}
            />
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.SUBJECTCREDITS)}</label>
            <Input
              name="credits"
              value={formData.credits || ""}
              onChange={handleChange}
              type="number"
              classname={style["input"]}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERSUBJECTCREIDTS)}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSECOURSE)}</label>

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

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSESEMESTER)}</label>

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
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.EMAIL)}</label>
            <Input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              classname={style["input"]}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERSTUDEEMAIL)}
            />
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.PASSWORD)}</label>
            <Input
              name="password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
              classname={style["input"]}
            />
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.STUDENTNAME)}</label>
            <Input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              type="text"
              classname={style["input"]}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERNAME)}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.ENROLLEDROLLNUMBER)}</label>

            <Input
              name="roll_number"
              value={formData.roll_number || ""}
              onChange={handleChange}
              type="text"
              classname={style["input"]}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERROLLNUMBER)}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.GENDER)}</label>
            <Select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              classname={style["select"]}
              options={[
                {
                  label: "Boy",
                  value: "M",
                },
                {
                  label: "Girl",
                  value: "F",
                },
              ]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSECOURSE)}</label>

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

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSESEMESTER)}</label>

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

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.STUDENTMARKS)}</label>

            <Input
              name="marks"
              value={formData.marks || ""}
              onChange={handleChange}
              type="number"
              classname={style["input"]}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERMARKS)}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.STUDENTGRADEPOINTS)}</label>

            <Input
              name="grade_points"
              value={formData.grade_points || ""}
              onChange={handleChange}
              type="number"
              classname={style["input"]}
               placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERGP)}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.RESULTS)}</label>

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
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSECOURSE)}</label>

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
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSESEMESTER)}</label>
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
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.TUITIONFEES)}</label>
            <Input
              name="tuition_fee"
              onChange={handleChange}
              value={formData.tuition_fee}
              type="number"
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERTUITIONFEES)}
              classname={style["input"]}
            />
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.EXAMFEES)}</label>
            <Input
              name="exam_fee"
              onChange={handleChange}
              value={formData.exam_fee}
              type="number"
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDEREXAMFEES)}
              classname={style["input"]}
            />
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.LIBRARYFEES)}</label>
            <Input
              name="library_fee"
              onChange={handleChange}
              value={formData.library_fee}
              type="number"
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERLIBFEES)}
              classname={style["input"]}
            />
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.OTHERFEES)}</label>
            <Input
              name="other_fee"
              onChange={handleChange}
              value={formData.other_fee}
              type="number"
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACHOLDEROTHERFEES)}
              classname={style["input"]}
            />
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.TOTALFEES)}</label>
            <Input
              name="total_fee"
              onChange={handleChange}
              value={Number(totalFee)}
              type="number"
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERTOTALFEES)}
              classname={style["input"]}
            />
          </>
        )}

        {stufees && (
          <>
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSESTUDENTNAME)}</label>
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

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSEFEES)}</label>
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

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.AMOUNTPAY)}</label>
            <Input
              name="amount_paid"
              value={formData.amount_paid}
              onChange={handleChange}
              type="number"
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERAMOUNTPAY)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.PAYMENTDATE)}</label>
            <Input
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
              type="date"
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.DUEAMOUNT)}</label>
            <Input
              name="due_amount"
              value={remaining}
              type="number"
              onChange={handleChange}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.PAYMENTSTATUS)}</label>
            <Input
              name="payment_status"
              value={payment_status}
              onChange={handleChange}
              classname={style["input"]}
            />
          </>
        )}

        {studDetail && (
          <>
            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CHOOSESTUDENTNAME)}</label>
            <Select
              name="student_id"
              classname={style["select"]}
              value={formData.student_id || ""}
              options={
                students?.map((student) => ({
                  label: `${student.name} (${student.roll_number})`,
                  value: student.id!,
                })) || []
              }
              onChange={handleChange}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.FULLNAME)}</label>
            <Input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERSTUDENTFULLNAME)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.EMAIL)}</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERSTUDEEMAIL)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.STPHNUMBER)}</label>
            <Input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERPHONENUMBER)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.ADDRESSDETAILS)}</label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACHOLDERADD)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.CITY)}</label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERCITY)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.STATE)}</label>
            <Input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERSTATE)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.COUNTRY)}</label>
            <Input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERCOU)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.DATEOFBIRTH)}</label>
            <Input
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              type="date"
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.FTHNAME)}</label>
            <Input
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACHOLDERFNAME)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.MTHNAME)}</label>
            <Input
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERMNAME)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.PRESCHOOL)}</label>
            <Input
              name="previous_school"
              value={formData.previous_school}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACEHOLDERPRESCHOOL)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.PRECOLLEGE)}</label>
            <Input
              name="previous_college"
              value={formData?.previous_college}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACHOLDERPRECOLLEGE)}
              classname={style["input"]}
            />

            <label className={style["label"]}>{formTrans(TRANSLATIONSAPPCONSTANTS.PREEDUCATION)}</label>
            <Input
              name="previous_study_field"
              value={formData.previous_study_field}
              onChange={handleChange}
              placeholder={formTrans(TRANSLATIONSAPPCONSTANTS.PLACHOLDERPREVIOUSEDU)}
              classname={style["input"]}
            />
          </>
        )}

        <button className={style["button"]} type="submit">
          {cou &&  formTrans(TRANSLATIONSAPPCONSTANTS.COURSEBTN)}
          {sem && formTrans(TRANSLATIONSAPPCONSTANTS.SEMESTERBTN)}
          {sub && formTrans(TRANSLATIONSAPPCONSTANTS.SUBJECTSBTN)}
          {stu && formTrans(TRANSLATIONSAPPCONSTANTS.STUDENTBTN)}
          {fees && formTrans(TRANSLATIONSAPPCONSTANTS.FEESBTN)}
          {stufees && formTrans(TRANSLATIONSAPPCONSTANTS.STUDENTFEESBTN)}
          {studDetail &&  formTrans(TRANSLATIONSAPPCONSTANTS.STUDENTDETAILSBTN)}
        </button>
      </form>
    </div>
  );
}
