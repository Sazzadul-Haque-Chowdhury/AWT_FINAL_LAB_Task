import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Student } from "../types/student";

const initialStudents: Student[] = [
  {
    name: "Sazzad Ahmed",
    id: "STU001",
    avatar: "https://i.pravatar.cc/150?img=12",
    gpa: 3.8,
    major: "Computer Science",
    courses: [
      "Data Structures",
      "Database Systems",
      "Web Development",
    ],
  },
  {
    name: "Nadia Rahman",
    id: "STU002",
    avatar: "https://i.pravatar.cc/150?img=47",
    gpa: 3.9,
    major: "Software Engineering",
    courses: [
      "Software Design",
      "Algorithms",
      "Web Development",
    ],
  },
  {
    name: "Tanvir Hasan",
    id: "STU003",
    avatar: "https://i.pravatar.cc/150?img=11",
    gpa: 3.6,
    major: "Information Technology",
    courses: [
      "Networking",
      "Database Systems",
      "Operating Systems",
    ],
  },
  {
    name: "Mim Akter",
    id: "STU004",
    avatar: "https://i.pravatar.cc/150?img=44",
    gpa: 3.7,
    major: "Data Science",
    courses: [
      "Statistics",
      "Machine Learning",
      "Data Analysis",
    ],
  },
];

type SortBy = "name" | "gpa";

interface StudentContextType {
  students: Student[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  favoriteIds: string[];
  handleFavoriteToggle: (studentId: string) => void;
  addStudent: (student: Student) => void;
  removeStudent: (studentId: string) => void;
  loading: boolean;
}

const StudentContext = createContext<
  StudentContextType | undefined
>(undefined);

interface StudentProviderProps {
  children: ReactNode;
}

export function StudentProvider({
  children,
}: StudentProviderProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
  const savedStudents = localStorage.getItem(
    "student-dashboard-students"
  );

  if (savedStudents) {
    try {
      const parsedStudents: Student[] =
        JSON.parse(savedStudents);

      setStudents(parsedStudents);
    } catch {
      setStudents(initialStudents);
    }
  } else {
    setStudents(initialStudents);
  }

  setLoading(false);
}, []);

useEffect(() => {
  if (!loading) {
    localStorage.setItem(
      "student-dashboard-students",
      JSON.stringify(students)
    );
  }
}, [students, loading]);

  const handleFavoriteToggle = (studentId: string) => {
    setFavoriteIds((currentFavorites) => {
      if (currentFavorites.includes(studentId)) {
        return currentFavorites.filter(
          (id) => id !== studentId
        );
      }

      return [...currentFavorites, studentId];
    });
  };
  const addStudent = (student: Student) => {
  setStudents((currentStudents) => [
    ...currentStudents,
    student,
  ]);
};
const removeStudent = (studentId: string) => {
  setStudents((currentStudents) =>
    currentStudents.filter(
      (student) => student.id !== studentId
    )
  );

  setFavoriteIds((currentFavorites) =>
    currentFavorites.filter(
      (id) => id !== studentId
    )
  );
};

  return (
    <StudentContext.Provider
      value={{
        students,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        favoriteIds,
        handleFavoriteToggle,
        loading,
        removeStudent,
        addStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudents must be used inside StudentProvider"
    );
  }

  return context;
}