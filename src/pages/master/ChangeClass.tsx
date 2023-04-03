import { useQuery } from "react-query";
import styled from "styled-components";
import { HeaderInstance } from "../../api/axios";
import { GoSearch } from "react-icons/go";
import { FaDownload } from "react-icons/fa";
import TabMenu from "../../components/TabMenu";
import ChangeClassModal from "../../components/modal/ChangeClassModal";
import { useState } from "react";

type User = {
    birth: string;
    email: string;
    name: string;
    regDt: string;
    className: string;
    seq: number;
};

export default function ChangeClass() {
    const [page, setPage] = useState(0);
    const [activePage, setActivePage] = useState(0);
    const { data: userList = [] } = useQuery<User[]>(
        `/api/member/stu/list?page=${page}`,
        async () => {
            const res = await HeaderInstance.get(
                `/api/member/stu/list?page=${page}`
            );
            return res.data.studentList;
        }
    );
    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
        setActivePage(pageNumber);
    };
    const [userInfo, setUserInfo] = useState({
        seq: 0,
        className: "",
        name: "",
    });
    const [modal, setModal] = useState(false);

    return (
        <section>
            <TabMenu menu="반 변경" />
            <ManageTable>
                <thead>
                    <tr>
                        <th></th>
                        <th>구분</th>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>이메일</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(
                        ({ className, name, email, birth, regDt, seq }) => {
                            return (
                                <tr key={seq}>
                                    <td>
                                        <input
                                            name={seq.toString()}
                                            type="checkbox"
                                            onChange={(e) => {
                                                setUserInfo({
                                                    seq,
                                                    className,
                                                    name,
                                                });
                                            }}
                                        />
                                    </td>
                                    <td>{className}</td>
                                    <td>{name}</td>
                                    <td>{birth}</td>
                                    <td>{email}</td>
                                    <td>{regDt}</td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </ManageTable>
            <ManageForm>
                <StyledGoSearch />
                <input type="text" placeholder="이름을 검색하세요." />
            </ManageForm>
            <div className="text-center">
                {[...Array(10)].map((_, index) => (
                    <button
                        className={`p-2 m-2 rounded-3xl hover:bg-blue-600 ${
                            activePage === index
                                ? "bg-red-500 text-white"
                                : "bg-blue-100"
                        }`}
                        key={index}
                        onClick={() => handlePageClick(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button
                className="absolute top-[950px] right-10 p-4 border rounded-full border-menuColor text-mainColor bg-menuColor hover:text-white hover:bg-mainColor"
                onClick={() => {
                    setModal(!modal);
                }}
            >
                반 병경
            </button>
            <div>
                <a
                    className="flex items-center text-2xl ml-9"
                    href="http://192.168.0.140:8686/api/class/excel"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaDownload className="mr-4 text-green-400" />
                    <p>변경 반 엑셀 다운로드</p>
                </a>
            </div>
            {modal && (
                <ChangeClassModal setModal={setModal} userInfo={userInfo} />
            )}
        </section>
    );
}

const ManageTable = styled.table`
    margin-top: 75px;
    margin-left: 39px;
    width: 95%;
    th {
        height: 62px;
        background-color: ${(props) => props.theme.colors.menuColor};
        border-bottom: 1px solid;
    }
    tbody {
        text-align: center;
        td {
            height: 62px;
            border-bottom: 1px solid;
        }
    }
`;

const ManageForm = styled.form`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0 39px;
    margin-top: 14px;
    input {
        width: 199px;
        font-weight: 400;
        font-size: 20px;
        outline: none;
        padding-left: 30px;
    }
`;
const StyledGoSearch = styled(GoSearch)`
    position: absolute;
    top: 5px;
    left: 45px;
    font-size: 20px;
`;
