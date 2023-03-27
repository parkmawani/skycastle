import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HeaderInstance } from "../../api/axios";
import { GoSearch } from "react-icons/go";
import TabMenu from "../../components/TabMenu";
import Button from "../../components/UI/Button";
import ChangeClassModal from "../../components/modal/ChangeClassModal";

type User = {
    birth: string;
    email: string;
    name: string;
    regDt: string;
    role: string;
    seq: number;
};

export default function ChangeClass() {
    const [userList, setUserList] = useState<User[]>([]);

    const fetchUserList = async () => {
        try {
            const res = await HeaderInstance.get("/api/member/stu/list");
            console.log(res);
            setUserList(res.data.studentList);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);
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
                        ({ role, name, email, birth, regDt, seq }) => {
                            return (
                                <tr key={seq}>
                                    <td>
                                        <input
                                            name={seq.toString()}
                                            type="checkbox"
                                            onChange={(e) =>
                                                console.log(e.target.name)
                                            }
                                        />
                                    </td>
                                    <td>{role}</td>
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
                <Button title="반 변경" />
            </ManageForm>
            <ChangeClassModal />
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
    button {
        margin-top: 46px;
    }
`;
const StyledGoSearch = styled(GoSearch)`
    position: absolute;
    top: 32px;
    left: 45px;
    font-size: 20px;
`;
