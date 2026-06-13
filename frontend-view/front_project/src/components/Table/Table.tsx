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
  MIcon,
  Semester,
  StudentFees,
  Students,
  Subject,
} from "@/src/assets";
import {
  currencyFormatter,
  formatDateTime,
  getOrdinal,
} from "@/src/utils/app.utils";

interface TableProps {
  data: any[];
  type: UNIVERSITY_SECTION_PAGES_ROUTES;
  handleDelete?: (id: any) => void;
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
  handleDelete,
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
  const course = type === UNIVERSITY_SECTION_TYPE.COURSES;
  const semester = type === UNIVERSITY_SECTION_TYPE.SEMESTERS;
  const subjects = type === UNIVERSITY_SECTION_TYPE.SUBJECTS;
  const students = type === UNIVERSITY_SECTION_TYPE.STUDENTS;
  const fees = type === UNIVERSITY_SECTION_TYPE.FEESTRUCTURE;
  const stuFees = type === UNIVERSITY_SECTION_TYPE.STUDENTFEES;
  const getHeaders = () => {
    if (course) {
      return ["Course Name", "Course Type", "Actions"];
    }

    if (semester) {
      return ["Semester", "Course Name", "Course Type", "Actions"];
    }

    if (subjects) {
      return ["Subject Name", "Subject Code", "Semester", "Actions"];
    }

    if (students) {
      return [
        "Student's Icon",
        "Student Name",
        "Roll No",
        "Course",
        "Semester",
        // "Marks",
        // "Result",
        "Actions",
      ];
    }
    if (fees) {
      return [
        "Course Name",
        "Semester Number",
        "Tutition Fees",
        "Exam Fees",
        "Library Fees",
        "Other Fees",
        "Total Fees",
        "Action",
      ];
    }

    if (stuFees) {
      return [
        "Student Name",
        "Roll Number",
        "Course Name",
        "Semester",
        "Total Fees",
        "Amount Paid",
        "Due Amount",
        "Payment Status",
        "Payment Date",
        "Action",
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
                Edit
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                Delete
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
            <td>{currencyFormatter(item.due_amount)}</td>
            <td>{item.payment_status}</td>
            <td>{formatDateTime(item.payment_date)}</td>
            <td>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                Edit
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      }

      if(course) {
        return (
          <tr key={index}>
            <td>{item.course_name}</td>
            <td>{item.course_type}</td>
             <td>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                Edit
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        )
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
                Edit
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                Delete
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
                View
              </button>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                Edit
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                Delete
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
            {/* <td>{item.marks}</td>
            <td>{item.result}</td> */}

            <td>
              <button
                className={style["view-btn"]}
                onClick={() => viewDetails?.(item.id)}
              >
                View
              </button>
              <button
                className={style["edit-btn"]}
                onClick={() => handleEdit?.(item.id)}
              >
                Edit
              </button>
              <button
                className={style["del-btn"]}
                onClick={() => openDeleteModal?.(item.id)}
              >
                Delete
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
            ? "Course Table"
            : semester
              ? "Semester Table"
              : subjects
                ? "Subjects Table"
                : students
                  ? "Students Detailed Table"
                  : fees
                    ? "Course Fees Detailed Table"
                    : stuFees
                      ? "Student Fees Detailed Table"
                      : "Table View"}
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
                        : ""
          }
          height={120}
          width={120}
          alt="table-image"
        />
        <p className={style["sub-heading"]}>Total Records : {totalRecords}</p>
        <div className={style["search-container"]}>
          <input
            className={style["search-input"]}
            placeholder="Search Here..."
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
        <button className={style["addbtn"]} onClick={addBtn}>
          {course
            ? "Add Course"
            : semester
              ? "Add Semester"
              : subjects
                ? "Add Subjects"
                : students
                  ? "Add Students"
                  : "Add "}
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
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={style["pagination"]}>
          <button
            className={style["prev-btn"]}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage?.(currentPage! - 1)}
          >
            Prev
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
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
