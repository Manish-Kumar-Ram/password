import React, { useState } from 'react';
import './PASS.css';
import cops from './cops.svg';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const lowerlist = 'abcdefhghijklmnopqerstuvwxyz';
const upperlist = 'ABCDEFGHIJKLMONPQRSTUVWXYZ';
const numberlist = '0123456789';
const symbolist = '@!)(878e4%$%#@_^*|?';

function PASS() {
    const [password, setPassword] = useState('');
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [passwordLength, setPasswordLength] = useState(8);

    const genratePassowrd = () => {
        let charlist = '';
        if (lowercase) {
            charlist += lowerlist;
        }
        if (uppercase) {
            charlist += upperlist;
        }
        if (numbers) {
            charlist += numberlist;
        }
        if (symbols) {
            charlist += symbolist;
        }
        let tempPassword = '';
        const characterLength = charlist.length;
        for (let i = 0; i < passwordLength; i++) {
            const charIndex = Math.floor(Math.random() * characterLength);
            tempPassword += charlist.charAt(charIndex);
        }
        setPassword(tempPassword);
    };

    const copypassword = async () => {
        if (password.length) {
            try {
                await navigator.clipboard.writeText(password);
                toast.success('Password copied to clipboard');
            } catch (err) {
                toast.error('Failed to copy password');
            }
        } else {
            toast.warn('No password to copy');
        }
    };

    return (
        <div className='container'>
            <ToastContainer />
            <h2 className='title'>Strong Password</h2>
            <div className='password-wrapper'>
                <div className='password-area'>
                    <div className='password'>
                        <input type='text' id='in' value={password} disabled placeholder='passowrd' />
                        <img src={cops} className='copy' alt="copy icon" onClick={copypassword} />
                    </div>
                </div>
            </div>
            <div className='setting'>
                <h3>Customize your Password</h3>
                <div className='customize'>
                    <div className='checkbox'>
                        <div className='left'>
                            <div className='checkbox_field'>
                                <input
                                    id="lowercase"
                                    name="lowercase"
                                    type="checkbox"
                                    checked={lowercase}
                                    onChange={() => setLowercase(!lowercase)}
                                />
                                <label htmlFor="lowercase">Lowercase Letters: (a-z)</label>
                            </div>
                            <div className='checkbox_field'>
                                <input
                                    id="uppercase"
                                    name="uppercase"
                                    type="checkbox"
                                    checked={uppercase}
                                    onChange={() => setUppercase(!uppercase)}
                                />
                                <label htmlFor="uppercase">Uppercase Letters: (A-Z)</label>
                            </div>
                        </div>
                        <div className='right'>
                            <div className='checkbox_field'>
                                <input
                                    id="numbers"
                                    name="numbers"
                                    type="checkbox"
                                    checked={numbers}
                                    onChange={() => setNumbers(!numbers)}
                                />
                                <label htmlFor="numbers">Include Numbers (0-9)</label>
                            </div>
                            <div className='checkbox_field'>
                                <input
                                    id="symbols"
                                    name="symbols"
                                    type="checkbox"
                                    checked={symbols}
                                    onChange={() => setSymbols(!symbols)}
                                />
                                <label htmlFor="symbols">Include Symbols</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='password-length'>
                <h3>Password length</h3>
                <div className='slider'>
                    <p className='rangevalue'>{passwordLength}</p>
                    <div className='range'>
                        <input
                            type='range'
                            min={10}
                            max={100}
                            value={passwordLength}
                            onChange={(event) => setPasswordLength(Number(event.currentTarget.value))}
                        />
                    </div>
                </div>
            </div>
            <div className='buttons'>
                <button onClick={genratePassowrd}>Generate Password</button>
                <button onClick={copypassword}>Copy Password</button>
            </div>
        </div>
    );
}

export default PASS;
