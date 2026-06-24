"use client";
import {
  UNIVERSITY_SECTION_PAGES_ROUTES,
  UNIVERSITY_SECTION_TYPE,
} from "@/src/types/university-section.type";
import style from "@/src/components/Table/table.module.scss";
import Image from "next/image";
import {
  Courses,
  Fees,
  FIcon,
  IdCard,
  MIcon,
  Semester,
  StudentFees,
  Students,
  Subject,
} from "@/src/assets";
import { currencyFormatter, getOrdinal } from "@/src/utils/app.utils";
import { useTranslations } from "next-intl";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
interface TableProps {
  data: any[];
  type: UNIVERSITY_SECTION_PAGES_ROUTES;
  handleEdit?: (id: any) => void;
  viewDetails?: (id: any) => void;
  addBtn?: () => void;
  openDeleteModal?: (id: number) => void;
  search?: string;
  setSearch?: (value: string) => void;
  currentPage?: number;
  totalPages?: number;
  onSearch?: () => void;
  setCurrentPage?: (page: number) => void;
  totalRecords?: number;
}

export default function Table({
  data,
  type,
  handleEdit,
  viewDetails,
  addBtn,
  openDeleteModal,
  search,
  setSearch,
  currentPage,
  setCurrentPage,
  totalPages,
  onSearch,
  totalRecords,
}: TableProps) {
  const course = type === UNIVERSITY_SECTION_TYPE.COURSE;
  const semester = type === UNIVERSITY_SECTION_TYPE.SEMESTERS;
  const subjects = type === UNIVERSITY_SECTION_TYPE.SUBJECTS;
  const students = type === UNIVERSITY_SECTION_TYPE.STUDENTS;
  const fees = type === UNIVERSITY_SECTION_TYPE.FEESTRUCTURE;
  const stuFees = type === UNIVERSITY_SECTION_TYPE.STUDENTFEES;
  const studDetail = type === UNIVERSITY_SECTION_TYPE.STUDENTDETAIL;
  const unitableTrans = useTranslations(
    TRANSLATIONSAPPCONSTANTS.UNIVERSITYTABLE,
  );

  const getHeaders = () => {
    if (course) {
      return [
        unitableTrans(TRANSLATIONSAPPCONSTANTS.COURSENAME),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.COURSETYPE),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.TOTALSEM),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.ACTIONS),
      ];
    }

    if (semester) {
      return [
        unitableTrans(TRANSLATIONSAPPCONSTANTS.SEMESTER),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.COURSENAME),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.COURSETYPE),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.ACTIONS),
      ];
    }

    if (subjects) {
      return [
        unitableTrans(TRANSLATIONSAPPCONSTANTS.SUBJECTNAME),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.SUBJECTCODE),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.SEMESTER),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.ACTIONS),
      ];
    }

    if (students) {
      return [
        unitableTrans(TRANSLATIONSAPPCONSTANTS.STUDENTICON),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.STUDENTNAME),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.ROLLNUMBER),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.COURSE),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.SEMESTER),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.RESULT),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.ACTIONS),
      ];
    }
    if (fees) {
      return [
        unitableTrans(TRANSLATIONSAPPCONSTANTS.COURSE),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.SEMESTER),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.TUITIONFEE),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.EXAMFEES),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.LIBRARYFEES),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.OTHERFEES),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.TOTALFEE),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.ACTIONS),
      ];
    }

    if (stuFees) {
      return [
        unitableTrans(TRANSLATIONSAPPCONSTANTS.STUDENTNAME),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.ROLLNUMBER),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.COURSE),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.SEMESTER),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.TOTALFEE),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.AMOUNTPAID),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.PAYMENTSTATUS),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.ACTIONS),
      ];
    }

    if (studDetail) {
      return [
        unitableTrans(TRANSLATIONSAPPCONSTANTS.STUDENTNAME),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.STUDENTEMAIL),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.STUDENTCONTACT),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.STUDENTEDUCATION),
        unitableTrans(TRANSLATIONSAPPCONSTANTS.ACTIONS),
      ];
    }

    return [];
  };

  const renderRows = () => {
    return data?.map((item, index) => {
      const totalFee =
        Number(item.tuition_fee || 0) +
        Number(item.exam_fee || 0) +
        Number(item.library_fee || 0) +
        Number(item.other_fee || 0);

      if (fees) {
        return (
          <tr key={index}>
            <td>{item.course_name}</td>
            <td>{getOrdinal(item.semester_number)}</td>
            <td>{currencyFormatter(item.tuition_fee)}</td>
            <td>{currencyFormatter(item.exam_fee)}</td>
            <td>{currencyFormatter(item.library_fee)}</td>
            <td>{currencyFormatter(item.other_fee)}</td>
            <td>{currencyFormatter(Number(totalFee))}</td>
            <td>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.EDIT)}
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.DELETE)}
              </button>
            </td>
          </tr>
        );
      }

      if (stuFees) {
        return (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.roll_number}</td>
            <td>{item.course_name}</td>
            <td>{getOrdinal(item.semester_number)}</td>
            <td>{currencyFormatter(item.total_fee)}</td>
            <td>{currencyFormatter(item.amount_paid)}</td>
            <td>{item.payment_status}</td>
            <td>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.EDIT)}
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.DELETE)}
              </button>
            </td>
          </tr>
        );
      }

      if (course) {
        return (
          <tr key={index}>
            <td>{item.course_name}</td>
            <td>{item.course_type}</td>
            <td>{item.total_semesters}</td>
            <td>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.EDIT)}
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.DELETE)}
              </button>
            </td>
          </tr>
        );
      }

      if (semester) {
        return (
          <tr key={index}>
            <td>{getOrdinal(item.semester_number)}</td>
            {/* <td>{item.id}</td> */}
            <td>{item.course_name}</td>
            <td>{item.course_type}</td>

            <td>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.EDIT)}
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.DELETE)}
              </button>
            </td>
          </tr>
        );
      }

      if (subjects) {
        return (
          <tr key={index}>
            <td>{item.subject_name}</td>
            <td>{item.subject_code}</td>
            {/* <td>{item.credits}</td>
            <td>{item.course_name}</td> */}
            <td>{getOrdinal(item.semester_number)}</td>
            <td>
              <button
                className={style["view-btn"]}
                onClick={() => viewDetails?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.VIEW)}
              </button>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.EDIT)}
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.DELETE)}
              </button>
            </td>
          </tr>
        );
      }

      if (students) {
        return (
          <tr key={index}>
            <td>
              <Image
                src={
                  item.gender === "F" ? FIcon : item.gender === "M" ? MIcon : ""
                }
                width={70}
                height={70}
                alt="images"
              />
            </td>
            <td>{item.name}</td>
            <td>{item.roll_number}</td>
            <td>{item.course_name}</td>
            <td>{getOrdinal(item.semester_number)}</td>
            {/*  {/* <td>{item.marks}</td> */}
            <td>{item.result}</td>

            <td>
              <button
                className={style["view-btn"]}
                onClick={() => viewDetails?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.VIEW)}
              </button>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.EDIT)}
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.DELETE)}
              </button>
            </td>
          </tr>
        );
      }

      if (studDetail) {
        return (
          <tr key={index}>
            <td>{item.full_name}</td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
            <td>{item.previous_study_field}</td>
            <td>
              <button
                className={style["view-btn"]}
                onClick={() => viewDetails?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.VIEW)}
              </button>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.EDIT)}
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                {unitableTrans(TRANSLATIONSAPPCONSTANTS.DELETE)}
              </button>
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <div className={style["table-container"]}>
      <div className={style["table-header"]}>
        <h2 className={style["heading"]}>
          {course
            ? unitableTrans(TRANSLATIONSAPPCONSTANTS.COURSET)
            : semester
              ? unitableTrans(TRANSLATIONSAPPCONSTANTS.SEMESTERT)
              : subjects
                ? unitableTrans(TRANSLATIONSAPPCONSTANTS.SUBJECTT)
                : students
                  ? unitableTrans(TRANSLATIONSAPPCONSTANTS.STUDENTT)
                  : fees
                    ? unitableTrans(TRANSLATIONSAPPCONSTANTS.FEEST)
                    : stuFees
                      ? unitableTrans(TRANSLATIONSAPPCONSTANTS.STUDEFEEST)
                      : studDetail
                        ? unitableTrans(TRANSLATIONSAPPCONSTANTS.STUDETAILT)
                        : unitableTrans(TRANSLATIONSAPPCONSTANTS.TABLEVIEW)}
        </h2>
        <Image
          src={
            course
              ? Courses
              : semester
                ? Semester
                : subjects
                  ? Subject
                  : students
                    ? Students
                    : fees
                      ? Fees
                      : stuFees
                        ? StudentFees
                        : studDetail
                          ? IdCard
                          : Courses
          }
          height={120}
          width={120}
          alt="table-image"
        />
        {!course && !semester && (
          <>
            <p className={style["sub-heading"]}>
              {unitableTrans(TRANSLATIONSAPPCONSTANTS.TOTALRECORDS)}
              {totalRecords}
            </p>
            <div className={style["search-container"]}>
              <input
                className={style["search-input"]}
                placeholder={unitableTrans(TRANSLATIONSAPPCONSTANTS.SEARCH)}
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch?.(value);
                  if (value.trim() === "") {
                    onSearch?.();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSearch?.();
                  }
                }}
              />
            </div>
          </>
        )}
        {/* <p className={style["sub-heading"]}>Total Records : {totalRecords}</p> */}
        <button className={style["addbtn"]} onClick={addBtn}>
          {course
            ? unitableTrans(TRANSLATIONSAPPCONSTANTS.ADDCOURSE)
            : semester
              ? unitableTrans(TRANSLATIONSAPPCONSTANTS.ADDSEMESTER)
              : subjects
                ? unitableTrans(TRANSLATIONSAPPCONSTANTS.ADDSUBJECTS)
                : students
                  ? unitableTrans(TRANSLATIONSAPPCONSTANTS.ADDSTUDENTS)
                  : fees
                    ? unitableTrans(TRANSLATIONSAPPCONSTANTS.ADDFEES)
                    : stuFees
                      ? unitableTrans(TRANSLATIONSAPPCONSTANTS.ADDSTUDENTFEES)
                      : studDetail
                        ? unitableTrans(
                            TRANSLATIONSAPPCONSTANTS.ADDSTUDENTPROFILE,
                          )
                        : unitableTrans(TRANSLATIONSAPPCONSTANTS.ADD)}
        </button>
      </div>

      <div className={style["table-wrapper"]}>
        <table className={style["table"]} border={1}>
          <thead>
            <tr>
              {getHeaders().map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              renderRows()
            ) : (
              <tr>
                <td colSpan={10} className={style["empty-data"]}>
                  {unitableTrans(TRANSLATIONSAPPCONSTANTS.NODATAFOUND)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {!course && (
          <div className={style["pagination"]}>
            <button
              className={style["prev-btn"]}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage?.(currentPage! - 1)}
            >
              {unitableTrans(TRANSLATIONSAPPCONSTANTS.PREV)}
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <span
                  key={page}
                  className={`${style["page-number"]} ${
                    currentPage === page ? style.active : ""
                  }`}
                  onClick={() => setCurrentPage?.(page)}
                >
                  {page}
                </span>
              );
            })}

            <button
              className={style["next-btn"]}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage?.(currentPage! + 1)}
            >
              {unitableTrans(TRANSLATIONSAPPCONSTANTS.NEXT)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
