import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

const ListUser = (props) => {
    const [form, setForm] = useState({
        id: '', //권한 변경할 유저 아이디
        nickname: '', //권한 변경할 유저 닉네임
        new_auth: '',
    })
    const { id, nickname, new_auth } = form;
    const onChange = e => {
        const nextForm = {
            ...form,
            [e.target.name]: e.target.value
        };
        setForm(nextForm);
    }

    const [authGroup, setAuthGroup] = useState({
        '0': false,
        '1': false,
        '-1': false
    })

    const handleRadio = (e) => {
        setForm({
            new_auth: [e.target.value]
        })
        setAuthGroup({
            [e.target.value]: [e.target.checked]
        })
    };

    const translationIsAdmin = (value) => {
        switch(value) {
            case 0:
                return "일반 사용자";
            case 1:
                return "관리자";
            case -1:
                return "정지된 회원";
            default:
                return "알 수 없음";
        }   
    };

    const [showModalAdmin, setSetModalAdmin] = useState(false);

    const handleModalAdminClose = () => {
        setSetModalAdmin(false);
    };

    const handleModalAdminShow = () => {
        setSetModalAdmin(true);
    };

    return (
        <div className="userList">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>아이디</th>
                        <th>닉네임</th>
                        <th>이메일</th>
                        <th>제시자로써 평점</th>
                        <th>요청자로써 평점</th>
                        <th>권한</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.users && props.users.map(
                        (user) => 
                        <tr key = {user.userId}>
                            <td><img className="smallUserProfile" src={''}/></td>
                            <td>{user.userId}</td>
                            <td>{user.nickname}</td>
                            <td>{user.email}</td>
                            <td>{user.sgst_rate} 점</td>
                            <td>{user.rqst_rate} 점</td>
                            <td>{translationIsAdmin(user.is_admin)}</td>
                            <td><Button onClick={() => {handleModalAdminShow(); setForm({id: user.userId, nickname: user.nickname, new_auth: user.is_admin});}}>회원 권한 수정</Button></td>
                            <td><Button>작성글 조회</Button></td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            
            <Modal show={showModalAdmin} onHide={handleModalAdminClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{nickname} 님의 새로운 권한을 선택해주세요.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ul>
                    <ol>
                        <label>
                            <input type="radio" name="authGroup" value='0' checked={authGroup[0]} onChange={handleRadio} />
                            {translationIsAdmin(0)}
                        </label>
                    </ol>
                    <ol>
                        <label>
                            <input type="radio" name="authGroup" value='1' checked={authGroup[1]} onChange={handleRadio} />
                            {translationIsAdmin(1)}
                        </label>
                    </ol>
                    <ol>
                        <label>
                            <input type="radio" name="authGroup" value='-1' checked={authGroup[-1]} onChange={handleRadio} />
                            {translationIsAdmin(-1)}
                        </label>
                    </ol>
                </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalAdminClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={() => props.handleUpdateAuth(id, new_auth)}>
                        수정
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default ListUser;