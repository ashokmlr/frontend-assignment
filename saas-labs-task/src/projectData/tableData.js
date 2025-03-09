import React, {useState, useEffect} from 'react';
import '../projectData/tableData.css'

const TableData = () => {

    const[tableInfo, setTableInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        const url = "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setTableInfo(data);
        }) 
        .catch(error => console.error('Error fetching data:', error));
    }, [])

    const totalPages = Math.ceil(tableInfo.length / rowsPerPage);

    const pageData = tableInfo.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div>
            <h1>Table Data</h1>
            <div className='projTable'>
                <table>
                    <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Percentage funded</th>
                        <th>Amount pledged</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pageData.map((items, index) => 
                        <tr key={items.id} aria-label={`Row ${index + 1}`}>
                        <td>{items['s.no']+1}</td>
                        <td>{items['percentage.funded']}</td>
                        <td>{items['amt.pledged']}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div className='pagination'>
                <button onClick={() => setCurrentPage(currentPage - 1)} 
                  disabled={currentPage === 1} 
                  aria-label="Go to previous page"
                  aria-disabled={currentPage === 1}
                  role="button">Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  aria-label="Go to next page"
                  aria-disabled={currentPage === totalPages}
                  role="button">Next</button>
            </div>
        </div>
    );
};

export default TableData;