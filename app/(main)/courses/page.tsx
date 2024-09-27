import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";


const CoursesPage = async () => {
    const coursesData =  getCourses();
    const UserProgressData =  getUserProgress();

    const [
        courses,
        UserProgress,
    ] = await Promise.all([
        coursesData,
        UserProgressData,
    ]);

    return(
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Language Courses
            </h1>
            <List
            courses={courses}
            activeCourseId={UserProgress?.activeCourseId}
             />
        </div>
    );
};

export default CoursesPage;