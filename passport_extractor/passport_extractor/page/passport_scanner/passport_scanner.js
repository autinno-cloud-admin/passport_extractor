frappe.pages["passport-scanner"].on_page_load = function (wrapper) {
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: __("Passport Scanner"),
		single_column: true,
	});

	// Styles
	$("#passport-scanner-styles").remove();
	const style = document.createElement("style");
	style.id = "passport-scanner-styles";
	style.textContent = `
		@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap");

		.ps-shell {
			--ps-ink: #0f172a;
			--ps-muted: #64748b;
			--ps-soft: #eef2ff;
			--ps-line: #dbe5f0;
			--ps-brand: #0f766e;
			--ps-brand-2: #0ea5a4;
			position: relative;
			overflow: hidden;
			padding: 24px;
			max-width: 1180px;
			margin: 0 auto;
			border-radius: 22px;
			background:
				linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(247, 251, 255, 0.96)),
				radial-gradient(900px 360px at 5% -8%, rgba(15, 118, 110, 0.16), transparent 62%),
				radial-gradient(700px 320px at 100% -10%, rgba(14, 165, 164, 0.16), transparent 58%);
			border: 1px solid #dae6f2;
			box-shadow: 0 20px 50px rgba(15, 23, 42, 0.09);
			font-family: "Manrope", "Avenir Next", "Segoe UI", sans-serif;
		}
		.ps-shell::before {
			content: "";
			position: absolute;
			inset: -2px;
			pointer-events: none;
			background: repeating-linear-gradient(
				-45deg,
				rgba(148, 163, 184, 0.08),
				rgba(148, 163, 184, 0.08) 2px,
				transparent 2px,
				transparent 10px
			);
			opacity: 0.08;
		}
		@media (max-width: 780px) {
			.ps-shell {
				padding: 16px;
				border-radius: 16px;
			}
		}
		.ps-head {
			display: flex;
			justify-content: space-between;
			gap: 14px;
			align-items: center;
			margin-bottom: 18px;
			position: relative;
			z-index: 1;
		}
		.ps-head h4 {
			margin: 0;
			font-size: clamp(22px, 3vw, 30px);
			line-height: 1.1;
			letter-spacing: -0.02em;
			font-weight: 800;
			color: var(--ps-ink);
		}
		.ps-head p {
			margin: 6px 0 0;
			font-size: 14px;
			max-width: 520px;
			color: var(--ps-muted);
		}
		.ps-badge {
			display: inline-flex;
			align-items: center;
			gap: 6px;
			padding: 8px 14px;
			border-radius: 999px;
			font-size: 12px;
			font-weight: 700;
			letter-spacing: 0.02em;
			border: 1px solid transparent;
			backdrop-filter: blur(4px);
		}
		.ps-badge.neutral {
			background: #f3f7fb;
			border-color: #d8e2ec;
			color: #35506b;
		}
		.ps-badge.processing {
			background: #fff7ed;
			border-color: #fdba74;
			color: #9a3412;
		}
		.ps-badge.success {
			background: #ecfdf3;
			border-color: #86efac;
			color: #166534;
		}
		.ps-badge.error {
			background: #fef2f2;
			border-color: #fca5a5;
			color: #991b1b;
		}
		.ps-layout {
			display: grid;
			grid-template-columns: minmax(320px, 1.05fr) minmax(300px, 0.95fr);
			gap: 24px;
			align-items: flex-start;
			position: relative;
			z-index: 1;
		}
		@media (max-width: 980px) {
			.ps-layout {
				grid-template-columns: 1fr;
			}
		}
		.ps-card {
			background: linear-gradient(180deg, #ffffff 0%, #f9fcff 100%);
			border: 1px solid #d6e3f0;
			border-radius: 18px;
			padding: 24px;
			box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);
		}
		.ps-upload-card {
			background:
				linear-gradient(165deg, rgba(255, 255, 255, 0.96), rgba(245, 252, 252, 0.96)),
				radial-gradient(500px 180px at 100% -20%, rgba(45, 212, 191, 0.18), transparent 60%);
		}
		.ps-results-card {
			background:
				linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 250, 255, 0.95));
		}
		.ps-card h5 {
			margin: 0 0 16px;
			font-size: 17px;
			font-weight: 700;
			letter-spacing: -0.01em;
			color: var(--ps-ink);
		}
		.ps-tips {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
			margin: 0 0 14px;
		}
		.ps-tip {
			font-size: 11px;
			font-weight: 700;
			letter-spacing: 0.02em;
			text-transform: uppercase;
			padding: 6px 10px;
			border-radius: 999px;
			background: #f1f5f9;
			border: 1px solid #dbe5ef;
			color: #3f5d7a;
		}
		.ps-upload-label {
			display: block;
			width: 100%;
			padding: 34px 16px;
			border: 2px dashed #9eb8cd;
			border-radius: 14px;
			text-align: center;
			cursor: pointer;
			color: var(--ps-muted);
			transition: border-color .2s, background-color .2s;
			background: linear-gradient(180deg, #f8fdff 0%, #f3f9ff 100%);
		}
		.ps-upload-label:hover {
			border-color: #0891b2;
			background: linear-gradient(180deg, #f2fbff 0%, #eaf7ff 100%);
		}
		.ps-upload-label svg {
			margin-bottom: 8px;
			color: #0f766e;
		}
		.ps-upload-title {
			font-weight: 700;
			font-size: 15px;
			color: #134e4a;
		}
		.ps-upload-hint {
			margin-top: 5px;
			font-size: 12px;
			color: #577089;
		}
		#ps-file-input { display: none; }
		.ps-file-meta {
			margin-top: 12px;
			padding: 10px 12px;
			font-size: 12px;
			font-weight: 600;
			color: #214563;
			background: #eff7ff;
			border: 1px solid #d0e3f7;
			border-radius: 10px;
			display: none;
		}
		.ps-preview-wrap {
			margin-top: 14px;
			padding: 10px;
			border-radius: 14px;
			border: 1px solid #d2dfec;
			background: linear-gradient(180deg, #f7fbff 0%, #f1f7fd 100%);
			min-height: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
		}
		#ps-preview {
			display: none;
			width: 100%;
			max-height: 300px;
			object-fit: contain;
			border-radius: 10px;
			background: #edf2f7;
		}
		.ps-cropper-container {
			display: none;
			width: 100%;
		}
		.ps-cropper-container img {
			max-width: 100%;
			border-radius: 10px;
		}
		.ps-preview-empty {
			display: block;
			text-align: center;
			padding: 36px 12px;
			font-size: 13px;
			font-weight: 600;
			color: #4b647c;
		}
		.ps-preview-fallback {
			display: none;
			text-align: center;
			padding: 36px 12px;
			font-size: 13px;
			font-weight: 600;
			color: #4b647c;
		}
		.ps-crop-controls {
			display: none;
			gap: 10px;
			margin-top: 12px;
			flex-wrap: wrap;
		}
		.ps-crop-controls.active {
			display: flex;
		}
		.ps-crop-btn {
			flex: 1;
			min-width: 100px;
			height: 36px;
			font-weight: 600;
			border: none;
			border-radius: 10px;
			cursor: pointer;
			transition: all .2s ease;
			font-size: 13px;
		}
		.ps-crop-btn-apply {
			background: linear-gradient(90deg, var(--ps-brand), var(--ps-brand-2));
			color: white;
			box-shadow: 0 4px 12px rgba(15, 118, 110, 0.24);
		}
		.ps-crop-btn-apply:hover {
			transform: translateY(-1px);
			box-shadow: 0 6px 16px rgba(15, 118, 110, 0.28);
		}
		.ps-crop-btn-cancel {
			background: #f1f5f9;
			color: #35506b;
			border: 1px solid #d8e2ec;
		}
		.ps-crop-btn-cancel:hover {
			background: #e8ecf1;
		}
		.ps-crop-btn-rotate {
			background: #f8fbff;
			color: #0f766e;
			border: 1px solid #c8dce8;
		}
		.ps-crop-btn-rotate:hover {
			background: #f2f7fc;
		}
		.ps-scan-btn {
			margin-top: 16px;
			width: 100%;
			height: 44px;
			font-weight: 700;
			border: none;
			border-radius: 12px;
			background: linear-gradient(90deg, var(--ps-brand), var(--ps-brand-2));
			box-shadow: 0 10px 20px rgba(15, 118, 110, 0.24);
			transition: transform .16s ease, box-shadow .16s ease, filter .2s ease;
		}
		.ps-scan-btn:hover:not(:disabled) {
			transform: translateY(-1px);
			filter: saturate(1.08);
			box-shadow: 0 12px 24px rgba(15, 118, 110, 0.28);
		}
		.ps-scan-btn:disabled {
			opacity: .75;
		}
		.ps-status {
			margin-top: 12px;
			font-size: 13px;
			color: var(--ps-muted);
			min-height: 18px;
		}
		.ps-result-grid {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 10px;
		}
		@media (max-width: 680px) {
			.ps-result-grid {
				grid-template-columns: 1fr;
			}
		}
		.ps-field-row {
			display: block;
			padding: 12px;
			border: 1px solid #d8e4f0;
			border-radius: 12px;
			background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
			box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04);
		}
		.ps-field-label {
			display: block;
			font-size: 11px;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: .5px;
			color: #5c738a;
			margin-bottom: 6px;
		}
		.ps-field-value {
			font-size: 15px;
			font-weight: 700;
			color: #0f172a;
			text-align: left;
			word-break: break-word;
		}
		.ps-empty {
			text-align: center;
			padding: 44px 0;
			color: var(--ps-muted);
			font-size: 13px;
			font-weight: 600;
		}
		@keyframes psPulse {
			0% { box-shadow: 0 0 0 0 rgba(14, 116, 144, 0.25); }
			70% { box-shadow: 0 0 0 10px rgba(14, 116, 144, 0); }
			100% { box-shadow: 0 0 0 0 rgba(14, 116, 144, 0); }
		}
		.ps-badge.processing {
			animation: psPulse 1.5s infinite;
		}
		/* Cropper.js overrides */
		.cropper-canvas,
		.cropper-drag-box {
			background-color: rgba(15, 23, 42, 0.6);
		}
		.cropper-modal {
			opacity: 0.6;
		}
		.cropper-view-box {
			outline-color: rgba(15, 118, 110, 0.8);
			outline-width: 2px;
		}
		.cropper-point,
		.cropper-line {
			background-color: #0f766e;
		}
		.cropper-bg {
			background-color: transparent;
		}
		.cropper-crop-box {
			border-color: #0f766e;
		}
		.cropper-handle {
			background-color: #0ea5a4;
			border-color: white;
		}
	`;
	document.head.appendChild(style);

	// Load Cropper.js library
	// const cropperCssUrl = "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css";
	// const cropperJsUrl = "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js";
	// after (when you vendor files under passport_extractor/public/...):
	const cropperCssUrl = "/assets/passport_extractor/css/cropper.min.css";
	const cropperJsUrl  = "/assets/passport_extractor/js/cropper.min.js";

	// Add CSS
	const cropperCssLink = document.createElement("link");
	cropperCssLink.rel = "stylesheet";
	cropperCssLink.href = cropperCssUrl;
	document.head.appendChild(cropperCssLink);

	// Markup
	$(page.body).html(`
		<div class="ps-shell">
			<div class="ps-head">
				<div>
					<p>${__("Upload a passport image, then extract MRZ details instantly.")}</p>
				</div>
				<span class="ps-badge neutral" id="ps-phase">${__("Ready")}</span>
			</div>

			<div class="ps-layout">
				<div class="ps-card ps-upload-card">
					<h5>${__("Upload Passport")}</h5>
					<div class="ps-tips">
						<span class="ps-tip">${__("Clear photo")}</span>
						<span class="ps-tip">${__("MRZ visible")}</span>
						<span class="ps-tip">${__("No glare")}</span>
					</div>

					<label class="ps-upload-label" for="ps-file-input">
						<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none"
							viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
						</svg>
						<div class="ps-upload-title">${__("Click to choose a file")}</div>
						<div class="ps-upload-hint">${__("Supported: JPG, PNG, PDF")}</div>
					</label>
					<input type="file" id="ps-file-input" accept="image/*,application/pdf" />

					<div class="ps-file-meta" id="ps-file-meta"></div>

					<div class="ps-preview-wrap">
						<img id="ps-preview" alt="${__("Passport preview")}" />
						<div class="ps-cropper-container" id="ps-cropper-container">
							<img id="ps-cropper-image" alt="${__("Cropper")}" />
						</div>
						<div class="ps-preview-empty" id="ps-preview-empty">
							${__("No passport uploaded yet. Please choose a file to preview.")}
						</div>
						<div class="ps-preview-fallback" id="ps-preview-fallback">
							${__("Preview is available for images only. PDF selected.")}
						</div>
					</div>

					<div class="ps-crop-controls" id="ps-crop-controls">
						<button class="ps-crop-btn ps-crop-btn-rotate" id="ps-crop-rotate" title="${__("Rotate 90°")}">
							↻ ${__("Rotate")}
						</button>
						<button class="ps-crop-btn ps-crop-btn-apply" id="ps-crop-apply">
							${__("Apply Crop")}
						</button>
						<button class="ps-crop-btn ps-crop-btn-cancel" id="ps-crop-cancel">
							${__("Cancel")}
						</button>
					</div>

					<button class="btn btn-primary ps-scan-btn" id="ps-scan-btn" disabled>
						${__("Scan Passport")}
					</button>
					<div class="ps-status" id="ps-status"></div>
				</div>

				<div class="ps-card ps-results-card">
					<h5>${__("Extracted Details")}</h5>
					<div id="ps-results">
						<div class="ps-empty">${__("Scan a passport to see results here.")}</div>
					</div>
				</div>
			</div>
		</div>
	`);

	// State
	let selectedFile = null;
	let uploadedFileUrl = null;
	let cropper = null;
	let croppedBlob = null;
	let isImageCropped = false;

	const $fileInput = $("#ps-file-input");
	const $preview = $("#ps-preview");
	const $previewEmpty = $("#ps-preview-empty");
	const $previewFallback = $("#ps-preview-fallback");
	const $fileMeta = $("#ps-file-meta");
	const $scanBtn = $("#ps-scan-btn");
	const $status = $("#ps-status");
	const $results = $("#ps-results");
	const $phase = $("#ps-phase");
	const $cropperContainer = $("#ps-cropper-container");
	const $cropperImage = $("#ps-cropper-image");
	const $cropControls = $("#ps-crop-controls");
	const $cropRotateBtn = $("#ps-crop-rotate");
	const $cropApplyBtn = $("#ps-crop-apply");
	const $cropCancelBtn = $("#ps-crop-cancel");

	const FIELD_LABELS = {
		name: __("Full Name"),
		passport_number: __("Passport Number"),
		dob: __("Date of Birth"),
		date_of_expiry: __("Date of Expiry"),
		gender: __("Gender"),
		nationality: __("Nationality"),
	};

	function escapeHtml(text) {
		return frappe.utils.escape_html(String(text || ""));
	}

	function setPhase(type, text) {
		$phase.removeClass("neutral processing success error").addClass(type).text(text);
	}

	function setStatus(type, text) {
		const indicator = type === "error" ? "red" : type === "success" ? "green" : "orange";
		$status.html(`<span class="indicator ${indicator}">${escapeHtml(text)}</span>`);
	}

	function prettySize(bytes) {
		if (!bytes) return "0 KB";
		const kb = bytes / 1024;
		if (kb < 1024) return `${kb.toFixed(1)} KB`;
		return `${(kb / 1024).toFixed(2)} MB`;
	}

	function showIdleResult() {
		$results.html(`<div class="ps-empty">${__("Scan a passport to see results here.")}</div>`);
	}

	function initCropper(imageSrc) {
		// If Cropper.js failed to load, fall back to plain preview
		if (typeof Cropper === "undefined") {
			setStatus("error", __("Cropper.js not available. Cropping disabled; using preview."));
			$cropperContainer.hide();
			$preview.attr("src", imageSrc).show();
			$previewEmpty.hide();
			return;
		}

		$cropperImage.attr("src", imageSrc);
		$preview.hide();
		$previewEmpty.hide();
		$previewFallback.hide();
		$cropperContainer.show();
		$cropControls.addClass("active");
		setPhase("neutral", __("Crop Image"));

		// Initialize Cropper.js
		if (cropper) {
			cropper.destroy();
		}

		cropper = new Cropper($cropperImage[0], {
			aspectRatio: NaN,
			viewMode: 1,
			autoCropArea: 0.8,
			responsive: true,
			guides: true,
			highlight: true,
			cropBoxMovable: true,
			cropBoxResizable: true,
			toggleDragModeOnDblclick: true,
			background: true,
			modal: true,
		});
	}

	function destroyCropper() {
		if (cropper) {
			cropper.destroy();
			cropper = null;
		}
		$cropperContainer.hide();
		$cropControls.removeClass("active");
	}

	function getCroppedImage() {
		return new Promise((resolve, reject) => {
			if (!cropper) {
				reject(new Error("Cropper not initialized"));
				return;
			}

			const canvas = cropper.getCroppedCanvas({
				maxWidth: 4096,
				maxHeight: 4096,
				fillColor: "#fff",
				imageSmoothingEnabled: true,
				imageSmoothingQuality: "high",
			});

			canvas.toBlob((blob) => {
				if (blob) {
					resolve(blob);
				} else {
					reject(new Error("Failed to create cropped image"));
				}
			}, selectedFile.type || "image/jpeg", 0.95);
		});
	}

	// File selection and preview
	$fileInput.on("change", function () {
		const file = this.files && this.files[0];
		if (!file) return;

		selectedFile = file;
		uploadedFileUrl = null;
		croppedBlob = null;
		isImageCropped = false;
		$scanBtn.prop("disabled", false);
		$status.text(__("File selected. Ready to scan."));
		setPhase("neutral", __("Ready"));

		$fileMeta
			.html(`${escapeHtml(file.name)} <span style="color:#94a3b8;">(${prettySize(file.size)})</span>`)
			.show();

		if (file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (e) => {
				initCropper(e.target.result);
			};
			reader.readAsDataURL(file);
		} else {
			destroyCropper();
			$preview.hide();
			$previewEmpty.hide();
			$previewFallback.show();
		}

		showIdleResult();
	});

	// Crop rotate
	$cropRotateBtn.on("click", function () {
		if (cropper) {
			cropper.rotate(90);
		}
	});

	// Apply crop
	$cropApplyBtn.on("click", async function () {
		try {
			$cropApplyBtn.prop("disabled", true).text(__("Processing..."));
			croppedBlob = await getCroppedImage();
			isImageCropped = true;

			// Display cropped image as preview
			const croppedUrl = URL.createObjectURL(croppedBlob);
			$preview.attr("src", croppedUrl).show();
			destroyCropper();

			$cropApplyBtn.prop("disabled", false).text(__("Apply Crop"));
			setPhase("neutral", __("Ready"));
			setStatus("success", __("Image cropped successfully. Ready to scan."));
		} catch (error) {
			setStatus("error", error.message || __("Failed to crop image"));
			$cropApplyBtn.prop("disabled", false).text(__("Apply Crop"));
		}
	});

	// Cancel crop
	$cropCancelBtn.on("click", function () {
		destroyCropper();
		croppedBlob = null;
		isImageCropped = false;
		selectedFile = null;
		uploadedFileUrl = null;
		$preview.hide();
		$previewEmpty.show();
		$status.text("");
		setPhase("neutral", __("Ready"));
	});

	async function uploadSelectedFile() {
		if (uploadedFileUrl) return uploadedFileUrl;

		// Use cropped blob if available, otherwise use original file
		const fileToUpload = croppedBlob || selectedFile;
		const fileName = isImageCropped ? `cropped_${selectedFile.name}` : selectedFile.name;

		const formData = new FormData();
		formData.append("file", fileToUpload, fileName);
		formData.append("is_private", "1");
		formData.append("folder", "Home");

		const response = await $.ajax({
			url: "/api/method/upload_file",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			headers: {
				"X-Frappe-CSRF-Token": frappe.csrf_token,
			},
		});

		const fileUrl = response && response.message && response.message.file_url;
		if (!fileUrl) {
			throw new Error(__("Could not upload selected file."));
		}

		uploadedFileUrl = fileUrl;
		return uploadedFileUrl;
	}

	// Scan button
	$scanBtn.on("click", function () {
		if (!selectedFile) return;

		$scanBtn.prop("disabled", true).text(__("Scanning..."));
		setPhase("processing", __("Processing"));
		setStatus("processing", __("Uploading file and extracting details..."));
		$results.html(`<div class="ps-empty">${__("Extracting details, please wait...")}</div>`);

		uploadSelectedFile()
			.then((fileUrl) => {
				return frappe.call({
					method: "passport_extractor.api.extract_passport_details",
					args: {
						file_url: fileUrl,
					},
				});
			})
			.then((r) => {
				const msg = r && r.message;
				if (!msg || msg.status !== 200) {
					const errText = (msg && msg.message) || __("Extraction failed.");
					throw new Error(errText);
				}

				setPhase("success", __("Completed"));
				setStatus("success", __("Passport details extracted successfully."));
				renderResults(msg.data || {});
			})
			.catch((error) => {
				const errText = (error && error.message) || __("Server error. Please try again.");
				setPhase("error", __("Failed"));
				setStatus("error", errText);
				$results.html(`<div class="ps-empty text-danger">${escapeHtml(errText)}</div>`);
			})
			.always(() => {
				$scanBtn.prop("disabled", false).text(__("Scan Passport"));
			});
	});

	// Render extracted fields
	function renderResults(data) {
		const rows = Object.entries(FIELD_LABELS)
			.map(([key, label]) => {
				const value = data[key] || "—";
				return `
					<div class="ps-field-row">
						<span class="ps-field-label">${label}</span>
						<span class="ps-field-value">${escapeHtml(value)}</span>
					</div>`;
			})
			.join("");

		$results.html(`<div class="ps-result-grid">${rows}</div>`);
	}

	// Load Cropper.js script dynamically
	const script = document.createElement("script");
	script.src = cropperJsUrl;
	script.onload = function () {
		// Cropper.js loaded successfully
		console.log("Cropper.js library loaded");
	};
	script.onerror = function () {
		console.error("Failed to load Cropper.js library");
		setStatus("error", __("Failed to load Cropper.js library — cropping disabled"));
		// Ensure crop controls aren't shown
		destroyCropper();
	};
	document.head.appendChild(script);
};
