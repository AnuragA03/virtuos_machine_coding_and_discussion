const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createStudent = async (req, res) => {
    const { StudentName, CollegeName, Round1Marks, Round2Marks, Round3Marks, TechnicalRoundMarks } = req.body;

    if(StudentName.length > 30){
        return res.status(400).json({error: "Student name is having characters more than 30"});
    }

    if(CollegeName.length > 50){
        return res.status(400).json({error: "College name is having characters more than 50"});
    }
    // Convert string marks to numbers
    const round1 = parseFloat(Round1Marks);
    const round2 = parseFloat(Round2Marks);
    const round3 = parseFloat(Round3Marks);
    const technical = parseFloat(TechnicalRoundMarks);

    // Validation for marks
    if (round1 > 10 || round1 < 0) {
        return res.status(400).json({ error: "Round 1 Marks must be between 0 and 10" });
    }
    if (round2 > 10 || round2 < 0) {
        return res.status(400).json({ error: "Round 2 Marks must be between 0 and 10" });
    }
    if (round3 > 10 || round3 < 0) {
        return res.status(400).json({ error: "Round 3 Marks must be between 0 and 10" });
    }
    if (technical > 20 || technical < 0) {
        return res.status(400).json({ error: "Technical Round Marks must be between 0 and 20" });
    }

    const TotalMarks = round1 + round2 + round3 + technical;
    const roundtotal3 = 10;
    const technicalRoundTotal = 20;
    let Result = "Rejected";
    const percentage = 65;

    if((round1/roundtotal3)*100 > percentage && (round2/roundtotal3)*100 > percentage && (round3/roundtotal3)*100 > percentage && (technical/technicalRoundTotal)*100 > percentage && TotalMarks > 35){
        Result = "Selected";   
    }

    try {
        const newStudent = await prisma.student.create({
            data: {
                StudentName,
                CollegeName,
                Round1Marks : round1,
                Round2Marks : round2,
                Round3Marks : round3,
                TechnicalRoundMarks : technical,
                TotalMarks,
                Result, // Ensure this matches your model
            }
        });
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Database creation error:', error);
        res.status(500).json({ error: "Error creating student" });
    }
};

// exports.getStudents = async (req, res) => {
//     try {
//         const students = await prisma.student.findMany(); // Fetch from student table
//         res.json(students);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching students" });
//     }
// };

exports.getRankedStudents = async (req, res) => {
    try {
        // Fetch all students
        let students = await prisma.student.findMany({
            orderBy: { TotalMarks: 'desc' } // Sort by TotalMarks in descending order
        });


        //rank assignment
        let rank = 1;
        for (let i = 0; i < students.length; i++) {
            if (i > 0 && students[i].Result === "Selected" && students[i-1].Result === "Selected" && students[i].TotalMarks === students[i - 1].TotalMarks) {
                students[i].rank = students[i - 1].rank; // Same rank as previous
            } else if(students[i].Result === "Rejected") {
                students[i].rank = 99; // New rank
            } else{
                students[i].rank = rank;
                rank++;
            }
        }
        
        for(let i = 0; i < students.length; i++){
            if(i > 0 && students[i-1].rank > students[i].rank){
                let temp = students[i-1];
                students[i - 1] = students[i];
                students[i] = temp;
            }
        }

        res.json(students); // Return the ranked students
    } catch (error) {
        console.error('Error fetching ranked students:', error);
        res.status(500).json({ error: "Error fetching ranked students" });
    }
};